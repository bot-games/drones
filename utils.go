package drones

import (
	"github.com/bot-games/drones/pb"
	"math"
)

func PosToGrid(options *pb.Options, pos *pb.Vec2) Position {
	return Position{
		X: uint8((pos.X + float32(options.CellSize)/2) / float32(options.CellSize)),
		Y: uint8((pos.Y + float32(options.CellSize)/2) / float32(options.CellSize)),
	}
}

func GridToPos(options *pb.Options, p Position) *pb.Vec2 {
	return &pb.Vec2{
		X: float32(p.X) * float32(options.CellSize),
		Y: float32(p.Y) * float32(options.CellSize),
	}
}

func CalculateDirectionVector(point1, point2 *pb.Vec2) *pb.Vec2 {
	dx := point2.X - point1.X
	dy := point2.Y - point1.Y

	return &pb.Vec2{X: dx, Y: dy}
}

func NormalizeVector(vector *pb.Vec2) *pb.Vec2 {
	magnitude := float32(math.Sqrt(float64(vector.X*vector.X + vector.Y*vector.Y)))
	if magnitude != 0 {
		return &pb.Vec2{X: vector.X / magnitude, Y: vector.Y / magnitude}
	}

	return &pb.Vec2{X: 0, Y: 0}
}
