package drones

import (
	"github.com/ByteArena/box2d"
	"github.com/bot-games/drones/pb"
)

func getWorld(options *pb.Options, state *pb.State) (*box2d.B2World, []*box2d.B2Body) {
	gravity := box2d.MakeB2Vec2(0, -9.8)
	world := box2d.MakeB2World(gravity)

	maze := Maze{
		Width:  uint8(options.Maze.Width),
		Height: uint8(options.Maze.Height),
		Walls:  options.Maze.Walls,
	}

	// Create walls
	for y := uint8(0); y < uint8(options.Maze.Height); y++ {
		for x := uint8(0); x < uint8(options.Maze.Width); x++ {
			if maze.IsWall(x, y) {
				bodyDef := box2d.NewB2BodyDef()
				bodyDef.Type = box2d.B2BodyType.B2_staticBody
				bodyDef.Position.Set(float64(x)*float64(options.CellSize), float64(y)*float64(options.CellSize))

				body := world.CreateBody(bodyDef)

				box := box2d.NewB2PolygonShape()
				box.SetAsBox(float64(options.CellSize/2), float64(options.CellSize/2))
				body.CreateFixture(box, 1)
			}
		}
	}

	// Create drones
	dronesBodies := make([]*box2d.B2Body, len(state.Players))
	for i, player := range state.Players {
		bodyDef := box2d.NewB2BodyDef()
		bodyDef.Type = box2d.B2BodyType.B2_dynamicBody
		bodyDef.Position.Set(float64(player.Drone.Pos.X), float64(player.Drone.Pos.Y))
		bodyDef.Bullet = true
		bodyDef.LinearDamping = 0.2
		bodyDef.AngularDamping = 0.9
		bodyDef.UserData = i
		body := world.CreateBody(bodyDef)

		dronesBodies[i] = body

		box := box2d.NewB2PolygonShape()
		box.SetAsBox(float64(options.Drone.Width/2), float64(options.Drone.Height/2))

		fixtureDef := box2d.MakeB2FixtureDef()
		fixtureDef.Shape = box
		fixtureDef.Density = 1.0
		fixtureDef.Friction = 0.2
		fixtureDef.Restitution = 0.8
		body.CreateFixtureFromDef(&fixtureDef)

		mass := box2d.MakeMassData()
		mass.Mass = float64(options.Drone.Weight)
		mass.I = 0.5
		body.SetMassData(&mass)
	}

	return &world, dronesBodies
}
