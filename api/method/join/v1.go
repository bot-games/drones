package join

import (
	"context"
	"errors"
	"github.com/bot-games/drones/pb"

	"github.com/go-qbit/rpc"

	manager "github.com/bot-games/game-manager"
)

type reqV1 struct {
	Token string `json:"token" desc:"User bot token from [profile](/profile)"`
	Debug bool   `json:"debug" desc:"Use it for games against SmartGuy. The debug game doesn't affect ratings. There is not time limit for a turn'"`
}

type gameV1 struct {
	Id      string      `json:"id"`
	Options *pb.Options `json:"options"`
}

var errorsV1 struct {
	InvalidToken  rpc.ErrorFunc `desc:"Invalid token"`
	AlreadyInGame rpc.ErrorFunc `desc:"The user is already in a game. Game id will be in data field"`
}

func (m *Method) ErrorsV1() interface{} {
	return &errorsV1
}

func (m *Method) V1(ctx context.Context, r *reqV1) (*gameV1, error) {
	g, err := m.gm.JoinGame(ctx, r.Token, r.Debug)
	if err != nil {
		var errInGame manager.ErrInGame
		if errors.Is(err, manager.ErrInvalidToken) {
			return nil, errorsV1.InvalidToken("Invalid token")
		} else if errors.As(err, &errInGame) {
			return nil, errorsV1.AlreadyInGame("The user is already in the game "+string(errInGame), string(errInGame))
		}

		return nil, err
	}

	return &gameV1{
		Id:      g.Uuid.String(),
		Options: g.Options.(*pb.Options),
	}, nil
}
