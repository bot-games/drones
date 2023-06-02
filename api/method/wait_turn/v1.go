package wait_turn

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

type stateV1 struct {
	TickId  uint16     `json:"tick_id"`
	Players []playerV1 `json:"players"`
}

type playerV1 struct {
	IsMe  bool    `json:"is_me,omitempty"`
	Drone droneV1 `json:"drone"`
}

type droneV1 struct {
	Pos   vec2    `json:"pos"`
	Angle float32 `json:"angle"`
}

type vec2 struct {
	X float32 `json:"x"`
	Y float32 `json:"y"`
}

var errorsV1 struct {
	InvalidToken  rpc.ErrorFunc `desc:"Invalid token"`
	InvalidGameId rpc.ErrorFunc `desc:"Invalid game ID"`
	GameFinished  rpc.ErrorFunc `desc:"The game has finished. The result is in the data field, can be one of **Draw**, **Win**, **Defeat**"`
}

func (m *Method) ErrorsV1() interface{} {
	return &errorsV1
}

func (m *Method) V1(ctx context.Context, r *reqV1) (*stateV1, error) {
	tickInfo, err := m.gm.WaitTurn(ctx, r.Token, r.GameId)
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

	state := tickInfo.State.(*pb.State)
	players := make([]playerV1, len(state.Players))

	for i, player := range state.Players {
		players[i] = playerV1{
			IsMe: tickInfo.CurUid == tickInfo.Uids[i],
			Drone: droneV1{
				Pos: vec2{
					X: player.Drone.Pos.X,
					Y: player.Drone.Pos.Y,
				},
				Angle: player.Drone.Angle,
			},
		}
	}

	return &stateV1{
		TickId:  tickInfo.Id,
		Players: players,
	}, nil
}
