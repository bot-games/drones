package drones

import (
	"math/rand"
	"strings"

	"github.com/itchyny/maze"

	"github.com/bot-games/drones/pb"
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

type MazeType int

const (
	CommonMaze MazeType = iota
	EmptySpacesMaze
	RaceTrackMaze
)

func NewCheckPoints(maze *Maze) []*pb.Options_CellPos {
	result := make([]*pb.Options_CellPos, 0)

	// spawn point
	result = append(result, getClosestFreeCell(maze, 0, 0))

	var available []Position
	for _, zone := range []struct {
		X1, Y1, X2, Y2 uint8
	}{
		{1, 1, maze.Width / 2, maze.Height / 2},
		{1, maze.Height/2 + 1, maze.Width / 2, maze.Height - 1},
		{maze.Width/2 + 1, maze.Height/2 + 1, maze.Width - 1, maze.Height - 1},
		{maze.Width/2 + 1, 1, maze.Width - 1, maze.Height / 2},
	} {
		available = available[:0]
		for y := zone.Y1; y <= zone.Y2; y++ {
			for x := zone.X1; x <= zone.X2; x++ {
				if !maze.IsWall(x, y) {
					available = append(available, Position{x, y})
				}
			}
		}
		pos := available[rand.Intn(len(available))]
		result = append(result, &pb.Options_CellPos{
			X: uint32(pos.X),
			Y: uint32(pos.Y),
		})
	}

	// finish point
	result = append(result, getClosestFreeCell(maze, int32(maze.Width), 0))

	return result
}

func getClosestFreeCell(maze *Maze, xTarget int32, yTarget int32) *pb.Options_CellPos {
	// loop all cells
	// find closest
	xClosest := int32(-1)
	yClosest := int32(-1)

	for x := uint8(0); x < maze.Width; x++ {
		for y := uint8(0); y < maze.Height; y++ {
			if !maze.IsWall(x, y) {
				if xClosest == -1 || yClosest == -1 {
					xClosest = int32(x)
					yClosest = int32(y)
				} else {
					if distance(xTarget, int32(x), yTarget, int32(y)) <
						distance(xTarget, xClosest, yTarget, yClosest) {
						xClosest = int32(x)
						yClosest = int32(y)
					}
				}
			}
		}
	}

	return &pb.Options_CellPos{X: uint32(xClosest), Y: uint32(yClosest)}
}

func distance(x1 int32, x2 int32, y1 int32, y2 int32) int32 {
	return (x1-x2)*(x1-x2) + (y1-y2)*(y1-y2)
}

func NewMaze() (*Maze, []*pb.Options_CellPos) {
	// generate maze type
	mazeType := MazeType(rand.Intn(3))

	switch mazeType {
	case CommonMaze:
		return newCommonMaze()
	case EmptySpacesMaze:
		return newEmptySpacesMaze()
	case RaceTrackMaze:
		return NewRaceTrackMaze()
	}
	// should not happen
	return newCommonMaze()
}

func newEmptySpacesMaze() (*Maze, []*pb.Options_CellPos) {
	size := 24
	res := &Maze{
		Width:  uint8(size),
		Height: uint8(size),
		Walls:  make([]byte, (size*size)/8),
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

	columnPeriodVariants := []int{0, 2, 3, 4}
	columnPeriod := columnPeriodVariants[rand.Intn(len(columnPeriodVariants))]

	// set column
	for y := uint8(1); y < res.Height-1; y++ {
		for x := uint8(1); x < res.Width-1; x++ {
			if columnPeriod != 0 && int(x)%columnPeriod == 0 && int(y)%columnPeriod == 0 {
				res.setWall(x, y)
			}
		}
	}

	checkpoints := NewCheckPoints(res)
	return res, checkpoints
}

func newCommonMaze() (*Maze, []*pb.Options_CellPos) {
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
		res.setWallInverted(0, uint8(y))
		for x, r := range []rune(str1[y][1:]) {
			if r == '█' {
				res.setWallInverted(uint8(x+1), uint8(y))
			}
		}

		offset := len([]rune(str1[y][1:]))
		for x, r := range []rune(str2[y][1:]) {
			if r == '█' {
				res.setWallInverted(uint8(offset+x+1), uint8(y))
			}
		}

		res.setWallInverted(uint8(offset+offset+1), uint8(y))
	}

	checkpoints := NewCheckPoints(res)
	return res, checkpoints
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
	return m.solveBfs(start, goal)
}

func (m *Maze) solveBfs(start Position, goal Position) []Position {
	// solve bfs
	visited := make(map[Position]bool)
	queue := []Position{start}
	visited[start] = true
	previous := make(map[Position]Position)

	for len(queue) > 0 {
		currentPos := queue[0]
		queue = queue[1:]

		if currentPos == goal {
			break
		}

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
			newPos := Position{uint8(int8(currentPos.X) + direction.X), uint8(int8(currentPos.Y) + direction.Y)}
			if m.IsWall(newPos.X, newPos.Y) || visited[newPos] {
				continue
			}
			visited[newPos] = true
			queue = append(queue, newPos)
			previous[newPos] = currentPos
		}
	}

	// build path
	var path []Position
	currentPos := goal
	for currentPos != start {
		path = append(path, currentPos)
		currentPos = previous[currentPos]
	}
	path = append(path, start)

	// reverse path
	for i := len(path)/2 - 1; i >= 0; i-- {
		opp := len(path) - 1 - i
		path[i], path[opp] = path[opp], path[i]
	}

	return path
}

// finds non-optimal path
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

func (m *Maze) setWallInverted(x, y uint8) {
	i := int(m.Height-y-1)*int(m.Width) + int(x)
	byteIndex := i / 8
	bitIndex := uint(i % 8)
	m.Walls[byteIndex] |= 1 << bitIndex
}

func (m *Maze) setWall(x, y uint8) {
	i := int(m.Height-y-1)*int(m.Width) + int(x)
	byteIndex := i / 8
	bitIndex := uint(i % 8)
	m.Walls[byteIndex] |= 1 << bitIndex
}

func (m *Maze) IsWall(x, y uint8) bool {
	i := int(m.Height-y-1)*int(m.Width) + int(x)
	byteIndex := i / 8
	bitIndex := uint(i % 8)
	return m.Walls[byteIndex]&(1<<bitIndex) > 0
}
