package drones

import (
	"testing"
)

func TestNewMaze(t *testing.T) {
	t.Log("\n" + NewMaze().String())
}
