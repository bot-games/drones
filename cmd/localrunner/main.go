package main

import (
	"github.com/bot-games/drones"
	"github.com/bot-games/drones/api"
	manager "github.com/bot-games/game-manager"
	"github.com/bot-games/localrunner"
	"github.com/bot-games/localrunner/scheduler"
	"github.com/bot-games/localrunner/storage"
)

func main() {
	gameStorage := storage.New()

	localrunner.Start(
		manager.New(
			"semaphore", "Semaphore",
			drones.Drones{},
			gameStorage, scheduler.New(),
			func(m *manager.GameManager) manager.GameApi {
				return api.New(m)
			},
		),
		gameStorage,
	)
}
