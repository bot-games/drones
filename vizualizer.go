package drones

import (
	"github.com/ByteArena/box2d"
	"github.com/hajimehoshi/ebiten/v2"
	"github.com/hajimehoshi/ebiten/v2/vector"
	"image/color"
)

const scale = 0.85

type Visualizer struct {
	world *box2d.B2World
}

func (v *Visualizer) Update() error { return nil }

func (v *Visualizer) Layout(outsideWidth, outsideHeight int) (screenWidth, screenHeight int) {
	return outsideWidth, outsideHeight
}

func (v *Visualizer) Draw(screen *ebiten.Image) {
	screen.Fill(color.Black)

	for body := v.world.GetBodyList(); body != nil; body = body.GetNext() {
		pos := body.GetPosition()
		for fixture := body.GetFixtureList(); fixture != nil; fixture = fixture.GetNext() {
			shape := fixture.M_shape.(*box2d.B2PolygonShape)

			clr := color.RGBA{0, 255, 0, 255}
			if body.M_userData == nil {
				clr = color.RGBA{255, 0, 0, 255}
			}

			width := float32(shape.M_vertices[2].X - shape.M_vertices[0].X)
			height := float32(shape.M_vertices[2].Y - shape.M_vertices[0].Y)
			vector.DrawFilledRect(screen,
				toScreenX(float32(pos.X+shape.M_vertices[0].X)), toScreenY(float32(pos.Y-shape.M_vertices[0].Y)),
				width*scale, height*scale,
				clr, true,
			)
		}
	}

	vector.DrawFilledRect(screen,
		toScreenX(50), toScreenY(50),
		5*scale, 5*scale,
		color.RGBA{255, 255, 0, 255}, true,
	)
}

func toScreenX(x float32) float32 {
	return 25 + x*scale
}

func toScreenY(y float32) float32 {
	return 960 - y*scale
}
