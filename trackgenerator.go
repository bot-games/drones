package drones

import (
	"github.com/bot-games/drones/pb"
	"math"
	"math/rand"
)

type PositionF struct {
	X, Y float32
}

func (f PositionF) angle() float32 {
	return float32(math.Atan2(float64(f.Y), float64(f.X)))
}

func (f PositionF) rotate(angle float64) PositionF {
	return PositionF{
		X: float32(math.Cos(angle)*float64(f.X) - math.Sin(angle)*float64(f.Y)),
		Y: float32(math.Sin(angle)*float64(f.X) + math.Cos(angle)*float64(f.Y)),
	}
}

/*
Creates a "maze race" track with branching paths, "smooth corners" and other obstacles to make it more challenging and exciting for players.

#### Function Overview:
1. Set the size and initialize a Maze object with borders.
2. Generate checkpoints with NewCheckPoints method.
3. Shuffle the additional list of checkpoints to randomly select 50% of them.
4. Remove duplicates from the selected second batch of checkpoints, then add remaining checkpoints to checkpointsForGame slice.
5. Shuffle all checkpoints in the checkpointsForCar slice, then assign the first checkpoint in the list to the initial car position.
6. Calculate the move and path of the car with respect to each checkpoint, and keep track of the path of the car as well.
7. Fill the rest of maze with walls, except for the cells visited by the car.
8. Return the generated race track maze and the checkpoints.
*/
func NewRaceTrackMaze() (*Maze, []*pb.Options_CellPos) {
	size := 30
	res := &Maze{
		Width:  uint8(size),
		Height: uint8(size),
		Walls:  make([]byte, (size*(size+1))/8),
	}

	// set border walls
	for x := uint8(0); x < res.Width; x++ {
		res.setWall(x, 0)
		res.setWall(x, res.Height-1)
	}
	for y := uint8(0); y < res.Height; y++ {
		res.setWall(0, y)
		res.setWall(res.Width-1, y)
	}
	checkpointsForGame := NewCheckPoints(res)
	secondBatchOfCheckpoins := NewCheckPoints(res)

	// shuffle second checkpoints
	for i := range secondBatchOfCheckpoins {
		j := rand.Intn(i + 1)
		secondBatchOfCheckpoins[i], secondBatchOfCheckpoins[j] = secondBatchOfCheckpoins[j], secondBatchOfCheckpoins[i]
	}
	// pick half
	secondBatchOfCheckpoins = secondBatchOfCheckpoins[:len(secondBatchOfCheckpoins)/2]

	// add all non existed before checkpoints
	for _, checkpoint := range secondBatchOfCheckpoins {
		exists := false
		for _, checkpoint2 := range checkpointsForGame {
			if checkpoint.X == checkpoint2.X && checkpoint.Y == checkpoint2.Y {
				exists = true
				break
			}
		}
		if !exists {
			checkpointsForGame = append(checkpointsForGame, checkpoint)
		}
	}

	checkpointsForCar := make([]*pb.Options_CellPos, 0)
	for _, checkpoint := range checkpointsForGame {
		checkpointsForCar = append(checkpointsForCar, &pb.Options_CellPos{
			X: checkpoint.X,
			Y: checkpoint.Y,
		})
	}

	// shuffle checkpointsForCar
	for i := range checkpointsForCar {
		j := rand.Intn(i + 1)
		checkpointsForCar[i], checkpointsForCar[j] = checkpointsForCar[j], checkpointsForCar[i]
	}

	// create object, move trough all checkpoints
	cellSize := float32(64)
	car := PositionF{
		X: float32(checkpointsForCar[0].X) * cellSize,
		Y: float32(checkpointsForCar[0].Y) * cellSize,
	}

	nextPointIndexI := 1

	carCellPath := make([]*pb.Options_CellPos, 0)
	prevMoveVector := PositionF{X: 1, Y: 0}

	// while not going trough all checkpoints
	carTick := 0
	for true {
		carTick++
		if nextPointIndexI >= len(checkpointsForCar) {
			break
		}
		carCell := pb.Options_CellPos{
			X: uint32((car.X + float32(cellSize)/2) / float32(cellSize)),
			Y: uint32((car.Y + float32(cellSize)/2) / float32(cellSize)),
		}

		// if latest cell is not the same as current
		if len(carCellPath) == 0 || carCellPath[len(carCellPath)-1].X != carCell.X || carCellPath[len(carCellPath)-1].Y != carCell.Y {
			carCellPath = append(carCellPath, &carCell)
		}

		// move car to next checkpoint
		nextCheckpointCell := checkpointsForCar[nextPointIndexI]
		nextCheckpointVec := PositionF{
			X: float32(nextCheckpointCell.X) * cellSize,
			Y: float32(nextCheckpointCell.Y) * cellSize,
		}

		// if car is in next checkpoint
		if carCell.X == nextCheckpointCell.X && carCell.Y == nextCheckpointCell.Y {
			nextPointIndexI++
			continue
		}

		// get vector from car to next checkpoint
		vectorToNextCheckpoint := sub(&nextCheckpointVec, &car)

		// normalize vector
		normalizedVectorToNextCheckpoint := normalize(&vectorToNextCheckpoint)
		angleToCheckpoint := normalizedVectorToNextCheckpoint.angle()

		angleToCheckpoint += float32(math.Sin(float64(carTick)/10000.0) / 100.0)

		prevAngle := prevMoveVector.angle()

		// limit rotate angle
		diffBetweenAngles := diffAnglesRadians(angleToCheckpoint, prevAngle)

		maximumRotationSpeed := float32(math.Pi / 3000)
		// if close to edge, then better rotation speed
		closeThreshold := uint32(2)
		if carCell.X < closeThreshold || carCell.Y < closeThreshold || carCell.X > uint32(res.Width)-closeThreshold || carCell.Y > uint32(res.Height)-closeThreshold {
			maximumRotationSpeed = float32(math.Pi / 50)
		}

		finalAngle := 0.0
		if math.Abs(float64(diffBetweenAngles)) > float64(maximumRotationSpeed) {
			if diffBetweenAngles > 0 {
				finalAngle = float64(prevAngle + maximumRotationSpeed)
			} else {
				finalAngle = float64(prevAngle - maximumRotationSpeed)
			}

		} else {
			finalAngle = float64(angleToCheckpoint)
		}

		moveVector := PositionF{X: cellSize / 10, Y: 0}.rotate(finalAngle)

		prevMoveVector = moveVector

		newPosition := add(&car, &moveVector)

		// if car in wall, then do not move car
		if res.IsWall(uint8(newPosition.X/cellSize), uint8(newPosition.Y/cellSize)) {
			// collision
		} else {
			car = newPosition
		}
	}

	// keep car track free, and fill all other cells by walls
	wallsCount := 0
	for x := uint8(0); x < res.Width; x++ {
		for y := uint8(0); y < res.Height; y++ {
			if !isInPath(carCellPath, x, y) {
				res.setWall(x, y)
				wallsCount++
			}
		}
	}

	return res, checkpointsForGame
}

func diffAnglesRadians(angle1 float32, angle2 float32) float32 {
	diff := angle1 - angle2
	if diff > math.Pi {
		diff -= 2 * math.Pi
	} else if diff < -math.Pi {
		diff += 2 * math.Pi
	}
	return diff
}

func isInPath(path []*pb.Options_CellPos, x uint8, y uint8) bool {
	for _, cell := range path {
		if distance(int32(cell.X), int32(x), int32(cell.Y), int32(y)) < 2 {
			return true
		}
	}
	return false
}

func multiply(p *PositionF, f float32) PositionF {
	return PositionF{
		X: p.X * f,
		Y: p.Y * f,
	}
}

func add(v1 *PositionF, v2 *PositionF) PositionF {
	return PositionF{
		X: v1.X + v2.X,
		Y: v1.Y + v2.Y,
	}
}

func normalize(v *PositionF) PositionF {
	length := float32(math.Sqrt(float64(v.X*v.X + v.Y*v.Y)))
	return PositionF{
		X: v.X / length,
		Y: v.Y / length,
	}
}

func sub(v1 *PositionF, v2 *PositionF) PositionF {
	return PositionF{
		X: v1.X - v2.X,
		Y: v1.Y - v2.Y,
	}
}
