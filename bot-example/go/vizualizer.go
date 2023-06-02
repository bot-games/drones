package main

import (
	"github.com/bot-games/drones"
	"github.com/bot-games/drones/bot-example/go/api"
	"github.com/bot-games/drones/pb"
	"github.com/hajimehoshi/ebiten/v2"
	"github.com/hajimehoshi/ebiten/v2/vector"
	"image"
	"image/color"
	"math"
)

const scale = 0.85

var (
	whiteImage    = ebiten.NewImage(3, 3)
	whiteSubImage = whiteImage.SubImage(image.Rect(1, 1, 2, 2)).(*ebiten.Image)
)

func init() {
	b := whiteImage.Bounds()
	pix := make([]byte, 4*b.Dx()*b.Dy())
	for i := range pix {
		pix[i] = 0xff
	}
	whiteImage.WritePixels(pix)
}

type Visualizer struct {
	options   *pb.Options
	state     **api.GameState
	path      *[]drones.Position
	nextPoint **pb.Vec2
}

func (v *Visualizer) Update() error { return nil }

func (v *Visualizer) Layout(outsideWidth, outsideHeight int) (screenWidth, screenHeight int) {
	return outsideWidth, outsideHeight
}

func (v *Visualizer) Draw(screen *ebiten.Image) {
	screen.Fill(color.Black)

	maze := drones.Maze{
		Width:  uint8(v.options.Maze.Width),
		Height: uint8(v.options.Maze.Height),
		Walls:  v.options.Maze.Walls,
	}

	// Create walls
	for y := uint8(0); y < uint8(v.options.Maze.Height); y++ {
		for x := uint8(0); x < uint8(v.options.Maze.Width); x++ {
			if maze.IsWall(x, y) {
				vector.DrawFilledRect(screen,
					toScreenX(float32(x)*float32(v.options.CellSize)-float32(v.options.CellSize)/2),
					toScreenY(float32(y)*float32(v.options.CellSize)+float32(v.options.CellSize)/2),
					float32(v.options.CellSize)*scale, float32(v.options.CellSize)*scale,
					color.RGBA{0, 255, 0, 255}, true)
			}
		}
	}

	if v.path != nil && len(*v.path) > 1 {
		for _, pos := range (*v.path)[1:] {
			vector.DrawFilledRect(screen,
				toScreenX(float32(pos.X)*float32(v.options.CellSize)-float32(v.options.CellSize)/2),
				toScreenY(float32(pos.Y)*float32(v.options.CellSize)+float32(v.options.CellSize)/2),
				float32(v.options.CellSize)*scale, float32(v.options.CellSize)*scale,
				color.RGBA{255, 255, 0, 255}, true)
		}
	}

	if v.nextPoint != nil && (*v.nextPoint) != nil {
		vector.DrawFilledRect(screen,
			toScreenX(float32((*v.nextPoint).X)-2),
			toScreenY(float32((*v.nextPoint).Y)+2),
			4*scale, 4*scale,
			color.RGBA{255, 0, 0, 255}, true)
	}

	if v.state != nil && *v.state != nil {
		for _, player := range (*v.state).Players {
			path := vector.Path{}
			path.MoveTo(-v.options.Drone.Width/2, +v.options.Drone.Height/2)
			path.LineTo(-v.options.Drone.Width/2, -v.options.Drone.Height/2)
			path.LineTo(+v.options.Drone.Width/2, -v.options.Drone.Height/2)
			path.LineTo(+v.options.Drone.Width/2, +v.options.Drone.Height/2)
			vs, is := path.AppendVerticesAndIndicesForFilling(nil, nil)

			var r, g, b float32
			if player.IsMe {
				r, g, b = 1, 0, 0
			} else {
				r, g, b = 0, 0, 1
			}

			for i := range vs {
				rotatedX := vs[i].DstX*float32(math.Cos(float64(player.Drone.Angle))) - vs[i].DstY*float32(math.Sin(float64(player.Drone.Angle)))
				rotatedY := vs[i].DstX*float32(math.Sin(float64(player.Drone.Angle))) + vs[i].DstY*float32(math.Cos(float64(player.Drone.Angle)))

				vs[i].SrcX = 1
				vs[i].SrcY = 1
				vs[i].DstX = toScreenX(player.Drone.Pos.X + rotatedX)
				vs[i].DstY = toScreenY(player.Drone.Pos.Y + rotatedY)
				vs[i].ColorR = r
				vs[i].ColorG = g
				vs[i].ColorB = b
				vs[i].ColorA = 1
			}

			op := &ebiten.DrawTrianglesOptions{}
			op.ColorScaleMode = ebiten.ColorScaleModePremultipliedAlpha
			op.AntiAlias = true
			screen.DrawTriangles(vs, is, whiteSubImage, op)
		}
	}
}

func toScreenX(x float32) float32 {
	return 25 + x*scale
}

func toScreenY(y float32) float32 {
	return 960 - y*scale
}
