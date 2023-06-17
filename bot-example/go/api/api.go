package api

import (
	"bytes"
	"encoding/json"
	"fmt"
	"github.com/bot-games/drones/pb"
	"net/http"
)

type Api struct {
	url string
}

type Game struct {
	Id      string      `json:"id"`
	Options *pb.Options `json:"options"`
}

type GameState struct {
	TickId  uint16   `json:"tick_id"`
	Players []Player `json:"players"`
}

type Player struct {
	IsMe  bool  `json:"is_me,omitempty"`
	Drone Drone `json:"drone"`
}

type Drone struct {
	Pos            Vec2    `json:"pos"`
	Angle          float32 `json:"angle"`
	NextCheckpoint int32   `json:"next_checkpoint"`
}

type Vec2 struct {
	X float32 `json:"x"`
	Y float32 `json:"y"`
}

type Error struct {
	Code    string      `json:"code"`
	Message string      `json:"message"`
	Data    interface{} `json:"data"`
}

func (e *Error) Error() string {
	return e.Message
}

func New(url string) *Api {
	return &Api{url: url}
}

func (a *Api) Join(token string, debug bool) (*Game, error) {
	game := &Game{}

	if err := a.call("/join/v1", struct {
		Token string `json:"token"`
		Debug bool   `json:"debug"`
	}{token, debug}, game); err != nil {
		return nil, err
	}

	return game, nil
}

func (a *Api) Rejoin(token, gameId string) (*Game, error) {
	game := &Game{}

	if err := a.call("/rejoin/v1", struct {
		Token  string `json:"token"`
		GameId string `json:"game_id"`
	}{token, gameId}, game); err != nil {
		return nil, err
	}

	return game, nil
}

func (a *Api) WaitTurn(token, gameId string) (*GameState, error) {
	gameState := &GameState{}

	if err := a.call("/wait_turn/v1", struct {
		Token  string `json:"token"`
		GameId string `json:"game_id"`
	}{token, gameId}, gameState); err != nil {
		return nil, err
	}

	return gameState, nil
}

func (a *Api) ActionApplyForce(token, gameId string, x, y, torque float32) error {
	var resp struct{}

	return a.call("/action/applyforce/v1", struct {
		Token  string  `json:"token"`
		GameId string  `json:"game_id"`
		X      float32 `json:"x"`
		Y      float32 `json:"y"`
		Torque float32 `json:"torque"`
	}{token, gameId, x, y, torque}, &resp)
}

func (a *Api) call(method string, req, resp interface{}) error {
	buf := &bytes.Buffer{}
	if err := json.NewEncoder(buf).Encode(req); err != nil {
		return err
	}

	httpResp, err := http.Post(a.url+method, "application/json", buf)
	if err != nil {
		return err
	}
	defer httpResp.Body.Close()

	switch httpResp.StatusCode {
	case http.StatusOK:
		return json.NewDecoder(httpResp.Body).Decode(resp)

	case http.StatusBadRequest:
		apiErr := &Error{}
		if err := json.NewDecoder(httpResp.Body).Decode(apiErr); err != nil {
			return err
		}
		return apiErr

	default:
		return fmt.Errorf("invalid status %s", httpResp.Status)
	}
}
