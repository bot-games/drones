package org.example;

import java.util.List;

public class Strategy {
    private Api.Options gameOptions;

    public void onJoinGame(Api.Options gameOptions) {
        this.gameOptions = gameOptions;
    }

    public Action getAction(Api.GameState gameState) {
        for (Api.GameState.Player player : gameState.players) {
            if (player.isMe) {
                Api.GameState.Drone drone = player.drone;
                Api.Options.CellPos nextCellPoint = gameOptions.maze.checkpoints.get(drone.nextCheckpointIndex);
                List<Api.Options.CellPos> path = PathFinding.solve(
                        gameOptions.maze,
                        Utils.posToGrid(gameOptions, drone.pos),
                        nextCellPoint
                );

                if (path.size() > 1) {
                    Api.Options.CellPos goal = path.get(1);
                    Api.Vec2 nextPoint = Utils.gridToPos(gameOptions, goal);
                    Api.Vec2 force = Utils.normalizeVector(Utils.calculateDirectionVector(drone.pos, nextPoint));
                    return new Action(force.x * 500, force.y * 500, 0f);
                }
            }
        }

        return new Action(0f, 0f, 0f);
    }
}
