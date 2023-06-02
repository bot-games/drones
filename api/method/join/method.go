package join

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
	return `Join`
}

func (m *Method) Description(context.Context) string {
	return `Join to a game`
}
