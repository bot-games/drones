package drones

import (
	"github.com/bot-games/drones/pb"
	"github.com/itchyny/maze"
	"math/rand"
	"strings"
)

const (
	width  = 5
	height = 11
)

var format = &maze.Format{
	Wall:               "█",
	Path:               " ",
	StartLeft:          " ",
	StartRight:         " ",
	GoalLeft:           " ",
	GoalRight:          " ",
	Solution:           " ",
	SolutionStartLeft:  " ",
	SolutionStartRight: " ",
	SolutionGoalLeft:   " ",
	SolutionGoalRight:  " ",
	Visited:            " ",
	VisitedStartLeft:   " ",
	VisitedStartRight:  " ",
	VisitedGoalLeft:    " ",
	VisitedGoalRight:   " ",
	Cursor:             " ",
}

type Maze struct {
	Width  uint8
	Height uint8
	Walls  []byte
}

type Position struct {
	X, Y uint8
}

func NewCheckPoints(maze *Maze) []*pb.Options_CellPos {
	result := make([]*pb.Options_CellPos, 0)

	for len(result) < 5 {

		newX := uint8(rand.Intn(int(maze.Width)))
		newY := uint8(rand.Intn(int(maze.Height)))
		prevPosition := Position{1, 1}
		if !maze.IsWall(newX, newY) {
			alreadyExists := arrayContainsPoint(result, newX, newY)
			if alreadyExists {
				continue
			}
			distanceFromPrev := len(maze.Solve(prevPosition, Position{newX, newY}))

			// TODO improve generation algorithm
			if distanceFromPrev < 40 && distanceFromPrev > 10 {
				prevPosition = Position{newX, newY}
				result = append(result, &pb.Options_CellPos{X: uint32(newX), Y: uint32(newY)})
			}
		}
	}

	if !arrayContainsPoint(result, 22, 1) {
		result = append(result, &pb.Options_CellPos{
			X: 22,
			Y: 1,
		})
	}

	return result
}

func NewMaze() *Maze {
	var directions1 [][]int
	for x := 0; x < height; x++ {
		directions1 = append(directions1, make([]int, width))
	}

	var directions2 [][]int
	for x := 0; x < height; x++ {
		directions2 = append(directions2, make([]int, width))
	}

	m1 := &maze.Maze{directions1, height, width,
		&maze.Point{height - 1, 0}, &maze.Point{0, width - 1}, &maze.Point{height - 1, 0},
		false, false, false}

	m2 := &maze.Maze{directions2, height, width,
		&maze.Point{0, 0}, &maze.Point{height - 1, width - 1}, &maze.Point{0, 0},
		false, false, false}

	m1.Generate()
	m2.Generate()

	str1 := strings.Split(m1.String(format), "\n")[1:]
	str2 := strings.Split(m2.String(format), "\n")[1:]

	res := &Maze{
		Width:  24,
		Height: 23,
		Walls:  make([]byte, (len(str1)-2)*(len([]rune(str1[0]))+len([]rune(str2[0])))/8),
	}

	for y := 0; y < len(str1)-2; y++ {
		res.setWall(0, uint8(y))
		for x, r := range []rune(str1[y][1:]) {
			if r == '█' {
				res.setWall(uint8(x+1), uint8(y))
			}
		}

		offset := len([]rune(str1[y][1:]))
		for x, r := range []rune(str2[y][1:]) {
			if r == '█' {
				res.setWall(uint8(offset+x+1), uint8(y))
			}
		}

		res.setWall(uint8(offset+offset+1), uint8(y))
	}

	return res
}

func (m *Maze) IsWall(x, y uint8) bool {
	i := int(m.Height-y-1)*int(m.Width) + int(x)
	byteIndex := i / 8
	bitIndex := uint(i % 8)
	return m.Walls[byteIndex]&(1<<bitIndex) > 0
}

func (m *Maze) String() string {
	var res string
	for y := uint8(0); y < m.Height; y++ {
		for x := uint8(0); x < m.Width; x++ {
			if m.IsWall(x, m.Height-y-1) {
				res += "█"
			} else {
				res += " "
			}
		}
		res += "\n"
	}

	return res
}

func (m *Maze) Solve(start, goal Position) []Position {
	visited := make(map[Position]bool)
	path := make([]Position, 0)
	m.solveRecursive(goal, start, visited, &path)
	return path
}

func (m *Maze) solveRecursive(goal, currentPos Position, visited map[Position]bool, path *[]Position) bool {
	if currentPos == goal {
		*path = append(*path, currentPos)
		return true
	}

	if m.IsWall(currentPos.X, currentPos.Y) || visited[currentPos] {
		return false
	}

	visited[currentPos] = true
	*path = append(*path, currentPos)

	for _, direction := range []struct {
		X int8
		Y int8
	}{
		{0, -1},
		{0, 1},
		{-1, 0},
		{1, 0},
	} {
		if currentPos.X == 0 && direction.X < 0 ||
			currentPos.Y == 0 && direction.Y < 0 {
			continue
		}
		newPos := Position{
			X: uint8(int8(currentPos.X) + direction.X),
			Y: uint8(int8(currentPos.Y) + direction.Y),
		}

		if m.solveRecursive(goal, newPos, visited, path) {
			return true
		}
	}

	*path = (*path)[:len(*path)-1]
	delete(visited, currentPos)
	return false
}

func (m *Maze) setWall(x, y uint8) {
	i := int(y)*int(m.Width) + int(x)
	byteIndex := i / 8
	bitIndex := uint(i % 8)
	m.Walls[byteIndex] |= 1 << bitIndex
}

func arrayContainsPoint(result []*pb.Options_CellPos, newX uint8, newY uint8) bool {
	contains := false
	for _, pos := range result {
		if pos.X == uint32(newX) && pos.Y == uint32(newY) {
			contains = true
			break
		}
	}
	return contains
}
