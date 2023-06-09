package rejoin

import (
	"context"
	"errors"
	"github.com/bot-games/drones/pb"

	"github.com/go-qbit/rpc"

	manager "github.com/bot-games/game-manager"
)

type reqV1 struct {
	Token  string `json:"token" desc:"User bot token from [profile](/profile)"`
	GameId string `json:"game_id"`
}

type gameV1 struct {
	Options *pb.Options `json:"options"`
}

var errorsV1 struct {
	InvalidToken  rpc.ErrorFunc `desc:"Invalid token"`
	InvalidGameId rpc.ErrorFunc `desc:"Invalid game ID"`
	GameFinished  rpc.ErrorFunc `desc:"The game has finished. The result is in the data field, can be one of **Draw**, **Win**, **Defeat**"`
}

func (m *Method) ErrorsV1() interface{} {
	return &errorsV1
}

func (m *Method) V1(ctx context.Context, r *reqV1) (*gameV1, error) {
	g, err := m.gm.RejoinGame(ctx, r.Token, r.GameId)
	if err != nil {
		errGameFinished := &manager.ErrEndOfGame{}

		if errors.Is(err, manager.ErrInvalidToken) {
			return nil, errorsV1.InvalidToken("Invalid token")
		} else if errors.Is(err, manager.ErrInvalidGameId) {
			return nil, errorsV1.InvalidGameId("Invalid game ID")
		} else if errors.As(err, errGameFinished) {
			var gameResult string
			if errGameFinished.Winner == 0 {
				gameResult = "Draw"
			} else if errGameFinished.IsYou {
				gameResult = "Win"
			} else {
				gameResult = "Defeat"
			}

			return nil, errorsV1.GameFinished("The game has finished", gameResult)
		}

		return nil, err
	}

	return &gameV1{
		Options: g.Options.(*pb.Options),
	}, nil
}
