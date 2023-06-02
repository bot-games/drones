package wait_turn

import (
	"context"

	manager "github.com/bot-games/game-manager"
)

type Method struct {
	gm *manager.GameManager
}

func New(gm *manager.GameManager) *Method {
	return &Method{
		gm: gm,
	}
}

func (m *Method) Caption(context.Context) string {
	return `Wait turn`
}

func (m *Method) Description(context.Context) string {
	return `Call the method to wait your turn and get the game status`
}
