//go:generate protoc -I proto --go_out=. drones/options.proto drones/state.proto drones/action.proto
package drones

import (
	"github.com/ByteArena/box2d"
	"github.com/bot-games/drones/pb"
	manager "github.com/bot-games/game-manager"
	"google.golang.org/protobuf/proto"
)

type Drones struct{}

type gameData struct {
	world  *box2d.B2World
	drones []*box2d.B2Body
}

func (d Drones) Init() (proto.Message, proto.Message, uint8, any) {
	maze, checkpoints := NewMaze()

	options := &pb.Options{
		Maze: &pb.Options_Maze{
			Width:       uint32(maze.Width),
			Height:      uint32(maze.Height),
			Walls:       maze.Walls,
			Checkpoints: checkpoints,
		},
		CellSize: 50,
		Drone: &pb.Options_Drone{
			Width:     18,
			Height:    8,
			Weight:    1,
			MaxForce:  500,
			MaxTorque: 5,
		},
		MaxTicks: 2000,
	}

	spawnPoint := checkpoints[0]

	state := &pb.State{
		Players: []*pb.Player{
			{
				Drone: &pb.Drone{
					Pos: &pb.Vec2{
						X: float32(spawnPoint.X*options.CellSize) + options.Drone.Weight/2,
						Y: float32(spawnPoint.Y*options.CellSize) - options.Drone.Height/2,
					},
					NextCheckpoint: 1,
				},
			},
			{
				Drone: &pb.Drone{
					Pos: &pb.Vec2{
						X: float32(spawnPoint.X*options.CellSize) + options.Drone.Weight/2,
						Y: float32(spawnPoint.Y*options.CellSize) + options.Drone.Height/2,
					},
					NextCheckpoint: 1,
				},
			},
		},
	}

	gd := &gameData{}
	gd.world, gd.drones = getWorld(options, state)

	//ebiten.SetWindowSize(1200, 1000)
	//ebiten.SetWindowTitle("Box2D Visualization")
	//go ebiten.RunGame(&Visualizer{
	//	world: gd.world,
	//})

	return options, state, 3, gd
}

func (d Drones) CheckAction(tickInfo *manager.TickInfo, action proto.Message) error {
	//pbAction := action.(*pb.Action)
	//pbAction.GetApplyForce()

	return nil
}

func (d Drones) ApplyActions(tickInfo *manager.TickInfo, actions []manager.Action) *manager.TickResult {
	state := tickInfo.State.(*pb.State)
	gameOptions := tickInfo.GameOptions.(*pb.Options)

	if tickInfo.Id >= uint16(gameOptions.MaxTicks) {
		return &manager.TickResult{
			GameFinished:    true,
			Winner:          0,
			NewState:        state,
			NextTurnPlayers: 0,
		}
	}

	for _, action := range actions {
		switch a := action.Action.(*pb.Action).Action.(type) {
		case *pb.Action_ApplyForce:
			force := LimitVector(&pb.Vec2{X: a.ApplyForce.X, Y: a.ApplyForce.Y}, gameOptions.Drone.MaxForce)
			torque := float64(LimitFloat(a.ApplyForce.Torque, gameOptions.Drone.MaxTorque))
			droneBody := tickInfo.GameData.(*gameData).drones[playerIdByUid(tickInfo.Uids, action.Uid)]
			droneBody.ApplyForceToCenter(box2d.MakeB2Vec2(float64(force.X), float64(force.Y)), true)
			droneBody.ApplyTorque(torque, true)
		default:
			panic("invalid action")
		}
	}

	for i := 0; i < 5; i++ {
		tickInfo.GameData.(*gameData).world.Step(1.0/60.0, 6, 2)
	}

	var finished []uint8

	for i, drone := range tickInfo.GameData.(*gameData).drones {
		nextCheckpointI := state.Players[i].Drone.NextCheckpoint
		nextCheckpointCellPos := gameOptions.Maze.Checkpoints[nextCheckpointI]
		nextCheckpoint := Position{
			X: uint8(nextCheckpointCellPos.X),
			Y: uint8(nextCheckpointCellPos.Y),
		}

		dronePos := b2VecToPbVec(drone.GetPosition())

		state.Players[i].Drone = &pb.Drone{
			Pos:            dronePos,
			Angle:          float32(drone.GetAngle()),
			NextCheckpoint: nextCheckpointI,
		}

		if PosToGrid(gameOptions, dronePos) == nextCheckpoint {
			state.Players[i].Drone.NextCheckpoint++
			if state.Players[i].Drone.NextCheckpoint == int32(len(gameOptions.Maze.Checkpoints)) {
				finished = append(finished, uint8(i+1))
			}
		}
	}

	switch len(finished) {
	case 1:
		tickInfo.GameData.(*gameData).world.Destroy()
		return &manager.TickResult{
			GameFinished: true,
			Winner:       finished[0],
			NewState:     state,
		}
	case 2:
		tickInfo.GameData.(*gameData).world.Destroy()
		return &manager.TickResult{
			GameFinished: true,
			Winner:       0,
			NewState:     state,
		}
	default:
		return &manager.TickResult{
			GameFinished:    false,
			NewState:        state,
			NextTurnPlayers: 3,
		}
	}
}

func (d Drones) SmartGuyTurn(tickInfo *manager.TickInfo) proto.Message {
	gameOptions := tickInfo.GameOptions.(*pb.Options)

	maze := Maze{
		Width:  uint8(gameOptions.Maze.Width),
		Height: uint8(gameOptions.Maze.Height),
		Walls:  gameOptions.Maze.Walls,
	}

	drone := tickInfo.State.(*pb.State).Players[playerIdByUid(tickInfo.Uids, 0)].Drone
	nextCheckpointCellPos := gameOptions.Maze.Checkpoints[drone.GetNextCheckpoint()]
	nextCheckpoint := Position{uint8(nextCheckpointCellPos.X), uint8(nextCheckpointCellPos.Y)}
	path := maze.Solve(PosToGrid(gameOptions, drone.Pos), nextCheckpoint)

	if len(path) > 1 {
		goal := path[1]
		nexPoint := GridToPos(gameOptions, goal)

		force := NormalizeVector(CalculateDirectionVector(drone.Pos, nexPoint))
		return &pb.Action{
			Action: &pb.Action_ApplyForce{
				ApplyForce: &pb.ActionApplyForce{
					X:      force.X * 500,
					Y:      force.Y * 500,
					Torque: 0.0,
				},
			},
		}
	}

	return &pb.Action{
		Action: &pb.Action_ApplyForce{
			ApplyForce: &pb.ActionApplyForce{
				X:      0,
				Y:      0,
				Torque: 0.0,
			},
		},
	}
}

func playerIdByUid(uids []uint32, uid uint32) uint8 {
	for i, u := range uids {
		if u == uid {
			return uint8(i)
		}
	}

	panic("invalid uid") // Must never happen
}

func b2VecToPbVec(vec box2d.B2Vec2) *pb.Vec2 {
	return &pb.Vec2{
		X: float32(vec.X),
		Y: float32(vec.Y),
	}
}

func LimitFloat(value float32, limit float32) float32 {
	if value > limit {
		return limit
	} else if value < -limit {
		return -limit
	} else {
		return value
	}
}
