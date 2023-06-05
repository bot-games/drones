package main

import (
	"flag"
	"github.com/bot-games/drones"
	"github.com/bot-games/drones/pb"
	"github.com/hajimehoshi/ebiten/v2"
	"log"
	"math"
	"math/rand"
	"time"

	"bot/api"
)

var (
	apiUrl = flag.String("url", "https://api.bot-games.fun/game/drones", "")
	token  = flag.String("token", "1", "")
	gameId = flag.String("game", "", "")
	debug  = flag.Bool("debug", false, "")
)

func main() {
	flag.Parse()
	rand.Seed(time.Now().UnixNano())

	if *token == "" {
		log.Fatalf("Empty token")
	}

	bsApi := api.New(*apiUrl)

	var gameOptions *pb.Options
	var state *api.GameState
	var path []drones.Position
	var nexPoint *pb.Vec2

	if *gameId == "" {
		log.Println("Waiting opponent")
		game, err := bsApi.Join(*token, *debug)
		if err != nil {
			if apiErr, ok := err.(*api.Error); ok && apiErr.Code == "AlreadyInGame" {
				*gameId = apiErr.Data.(string)
			} else {
				log.Fatal(err)
			}
		} else {
			*gameId = game.Id
		}
		gameOptions = game.Options
	}

	ebiten.SetWindowSize(1200, 1000)
	ebiten.SetWindowTitle("Box2D Visualization")
	go ebiten.RunGame(&Visualizer{
		options:   gameOptions,
		state:     &state,
		path:      &path,
		nextPoint: &nexPoint,
	})

	maze := drones.Maze{
		Width:  uint8(gameOptions.Maze.Width),
		Height: uint8(gameOptions.Maze.Height),
		Walls:  gameOptions.Maze.Walls,
	}

	for {
		log.Println("Waiting for turn")
		gameState, err := bsApi.WaitTurn(*token, *gameId)
		if err != nil {
			if apiErr, ok := err.(*api.Error); ok && apiErr.Code == "GameFinished" {
				log.Printf("The game has finished. Your result is `%s`", apiErr.Data)
				return
			}

			log.Fatal(err)
		}
		state = gameState

		var myPlayer *api.Player
		for _, p := range gameState.Players {
			if p.IsMe {
				myPlayer = &p
				break
			}
		}

		drone := myPlayer.Drone
		path = maze.Solve(posToGrid(gameOptions, &pb.Vec2{
			X: drone.Pos.X,
			Y: drone.Pos.Y,
		}), drones.Position{
			X: uint8(gameOptions.Maze.Goal.X),
			Y: uint8(gameOptions.Maze.Goal.Y),
		})

		if len(path) > 1 {
			goal := path[1]
			nexPoint = gridToPos(gameOptions, goal)

			force := normalizeVector(calculateDirectionVector(&pb.Vec2{
				X: drone.Pos.X,
				Y: drone.Pos.Y,
			}, nexPoint))
			if err := bsApi.ActionApplyForce(*token, *gameId, force.X*500, force.Y*500); err != nil {
				log.Fatal(err)
			}
		} else {
			if err := bsApi.ActionApplyForce(*token, *gameId, 0, 0); err != nil {
				log.Fatal(err)
			}
		}

		time.Sleep(30 * time.Millisecond)
	}
}

func posToGrid(options *pb.Options, pos *pb.Vec2) drones.Position {
	return drones.Position{
		X: uint8((pos.X + float32(options.CellSize)/2) / float32(options.CellSize)),
		Y: uint8((pos.Y + float32(options.CellSize)/2) / float32(options.CellSize)),
	}
}

func gridToPos(options *pb.Options, p drones.Position) *pb.Vec2 {
	return &pb.Vec2{
		X: float32(p.X) * float32(options.CellSize),
		Y: float32(p.Y) * float32(options.CellSize),
	}
}

func calculateDirectionVector(point1, point2 *pb.Vec2) *pb.Vec2 {
	dx := point2.X - point1.X
	dy := point2.Y - point1.Y
	return &pb.Vec2{X: dx, Y: dy}
}

func normalizeVector(vector *pb.Vec2) *pb.Vec2 {
	magnitude := float32(math.Sqrt(float64(vector.X*vector.X + vector.Y*vector.Y)))
	if magnitude != 0 {
		return &pb.Vec2{X: vector.X / magnitude, Y: vector.Y / magnitude}
	}
	return &pb.Vec2{X: 0, Y: 0}
}
