//go:generate gostatic2lib -path docs/md/ -package docs -out docs/game.go
//go:generate gostatic2lib -path ../player/dist -package player -out ./player/dist.go

package api

import (
	"bytes"
	"compress/gzip"
	"context"
	"io"
	"net/http"

	"github.com/go-qbit/rpc"
	"github.com/go-qbit/rpc/openapi"

	"github.com/bot-games/drones/api/docs"
	"github.com/bot-games/drones/api/player"
	manager "github.com/bot-games/game-manager"

	mActionApplyForce "github.com/bot-games/drones/api/method/action/applyforce"
	mJoin "github.com/bot-games/drones/api/method/join"
	mRejoin "github.com/bot-games/drones/api/method/rejoin"
	mWaitTurn "github.com/bot-games/drones/api/method/wait_turn"
)

type DronesRpc struct {
	*rpc.Rpc
}

func New(gm *manager.GameManager) *DronesRpc {
	gameRpc := &DronesRpc{rpc.New("github.com/bot-games/drones/api/method", rpc.WithCors("*"))}

	if err := gameRpc.RegisterMethods(
		mJoin.New(gm),
		mRejoin.New(gm),
		mWaitTurn.New(gm),
		mActionApplyForce.New(gm),
	); err != nil {
		panic(err)
	}

	return gameRpc
}

func (r *DronesRpc) GetSwagger(ctx context.Context) *openapi.OpenApi {
	swagger := r.Rpc.GetSwagger(ctx)
	swagger.Info.Title = "Drones bot API"

	gz, _ := gzip.NewReader(bytes.NewBuffer(docs.NewHTTPHandler().GetFile("/game.md").Data))
	data, _ := io.ReadAll(gz)

	swagger.Info.Description = string(data)

	return swagger
}

func (r *DronesRpc) GetPlayerHandler() http.Handler {
	return player.NewHTTPHandler()
}
