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
	maze := NewMaze()

	options := &pb.Options{
		Maze: &pb.Options_Maze{
			Width:  uint32(maze.Width),
			Height: uint32(maze.Height),
			Walls:  maze.Walls,
			Goal: &pb.Options_CellPos{
				X: 22,
				Y: 1,
			},
		},
		CellSize: 50,
		Drone: &pb.Options_Drone{
			Width:  18,
			Height: 8,
			Weight: 1,
		},
		MaxTicks: 2000,
	}

	state := &pb.State{
		Players: []*pb.Player{
			{
				Drone: &pb.Drone{
					Pos: &pb.Vec2{
						X: float32(options.CellSize) + options.Drone.Weight/2,
						Y: float32(options.CellSize) - options.Drone.Height/2,
					},
				},
			},
			{
				Drone: &pb.Drone{
					Pos: &pb.Vec2{
						X: float32(options.CellSize) + options.Drone.Weight/2,
						Y: float32(options.CellSize) + options.Drone.Height/2,
					},
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

func (d Drones) DecodeState(data []byte) (proto.Message, error) {
	state := &pb.State{}
	if err := proto.Unmarshal(data, state); err != nil {
		return nil, err
	}

	return state, nil
}

func (d Drones) DecodeAction(data []byte) (proto.Message, error) {
	action := &pb.Action{}
	if err := proto.Unmarshal(data, action); err != nil {
		return nil, err
	}

	return action, nil
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
			tickInfo.GameData.(*gameData).drones[playerIdByUid(tickInfo.Uids, action.Uid)].
				ApplyForceToCenter(box2d.MakeB2Vec2(float64(a.ApplyForce.X), float64(a.ApplyForce.Y)), true)
		default:
			panic("invalid action")
		}
	}

	for i := 0; i < 5; i++ {
		tickInfo.GameData.(*gameData).world.Step(1.0/60.0, 6, 2)
	}

	var finished []uint8
	goal := Position{
		X: uint8(gameOptions.Maze.Goal.X),
		Y: uint8(gameOptions.Maze.Goal.Y),
	}
	for i, drone := range tickInfo.GameData.(*gameData).drones {
		dronePos := b2VecToPbVec(drone.GetPosition())
		state.Players[i].Drone = &pb.Drone{
			Pos:   dronePos,
			Angle: float32(drone.GetAngle()),
		}

		if PosToGrid(gameOptions, dronePos) == goal {
			finished = append(finished, uint8(i+1))
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
	path := maze.Solve(PosToGrid(gameOptions, drone.Pos), Position{uint8(gameOptions.Maze.Goal.X), uint8(gameOptions.Maze.Goal.Y)})

	if len(path) > 1 {
		goal := path[1]
		nexPoint := GridToPos(gameOptions, goal)

		force := NormalizeVector(CalculateDirectionVector(drone.Pos, nexPoint))
		return &pb.Action{
			Action: &pb.Action_ApplyForce{
				ApplyForce: &pb.ActionApplyForce{
					X: force.X * 500,
					Y: force.Y * 500,
				},
			},
		}
	}

	return &pb.Action{
		Action: &pb.Action_ApplyForce{
			ApplyForce: &pb.ActionApplyForce{
				X: 0,
				Y: 0,
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
