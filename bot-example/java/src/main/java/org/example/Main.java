package org.example;

import java.net.SocketTimeoutException;
import java.util.List;
import java.util.Random;

public class Main {
    public static void main(String[] args) throws Exception {
        //String apiUrl = "http://localhost:10000/game";        // localrunner
        String apiUrl = "https://api.bot-games.fun/game/drones"; // production

        //String apiToken = new Random().nextInt(0, 2000000) + ""; // localrunner
        String apiToken = "TOKEN FROM https://bot-games.fun/profile"; // production
        String apiGameId = null;
        boolean apiDebug = false;   // true for game against SmartGuy (dummy bot), false for game against other players

        Api api = new Api(apiUrl);

        Api.Game game;

        if (apiGameId != null) {
            System.out.println("Rejoin ongoing game with specified id " + apiGameId);
            game = api.rejoin(apiToken, apiGameId);
        } else {
            System.out.println("Waiting for game to start...");
            while (true) {   // retry on timeout
                try {
                    game = api.join(apiToken, apiDebug);
                    break;
                } catch (Throwable e) {
                    if (e instanceof GameServerError) {
                        GameServerError ex = (GameServerError) e;
                        if (ex.error.code.equals("AlreadyInGame")
                                && ex.error.data instanceof String) {
                            System.out.println("Rejoin ongoing game " + ex.error.data);
                            apiGameId = (String) ex.error.data;
                            game = api.rejoin(apiToken, apiGameId);
                            break;
                        }
                    } else if (e instanceof SocketTimeoutException) {
                        System.out.println("Join timeout, sleep and retrying...");
                        Thread.sleep(500);
                    } else {
                        throw e;
                    }
                }
            }
        }

        Api.Options gameOptions = game.options;

        String actualGameId = apiGameId != null ? apiGameId : game.id;

        int tick;
        while (true) {
            Api.GameState gameState;

            try {
                System.out.println(" Waiting for turn...");
                gameState = api.waitTurn(apiToken, actualGameId);
                tick = gameState.tickId;
                System.out.println(tick + " Turn received");
            } catch (Throwable e) {
                if (e instanceof GameServerError) {
                    GameServerError ex = (GameServerError) e;
                    if (ex.error.code.equals("GameFinished")) {
                        String gameResult = ex.error.data != null ? ex.error.data.toString() : "?";
                        boolean iWinGame = ex.error.data != null && ex.error.data.toString().equals("Win");
                        System.out.println("Game finished with result=" + gameResult + " iWinGame=" + iWinGame);

                        System.out.println("Production game replay " + apiUrl.replaceAll("api.", "") + "/battle/" + game.id);
                        System.out.println("Localrunner game replay " + apiUrl.replaceAll("/game", "") + "/battle/" + game.id);
                        break;
                    }
                }
                throw e;
            }

            for (Api.GameState.Player player : gameState.players) {
                if (player.isMe) {
                    Api.GameState.Drone drone = player.drone;
                    Api.Options.CellPos nextCellPoint = gameOptions.maze.checkpoints.get(drone.nextCheckpointIndex);
                    List<Api.Options.CellPos> path = PathFinding.solve(
                            gameOptions.maze,
                            posToGrid(gameOptions, drone.pos),
                            nextCellPoint
                    );

                    if (path.size() > 1) {
                        Api.Options.CellPos goal = path.get(1);
                        Api.Vec2 nextPoint = gridToPos(gameOptions, goal);
                        Api.Vec2 force = normalizeVector(calculateDirectionVector(drone.pos, nextPoint));
                        api.applyForce(apiToken, actualGameId, force.x * 500, force.y * 500);
                    } else {
                        api.applyForce(apiToken, actualGameId, 0F, 0F);
                    }
                }
            }
            Thread.sleep(30);
        }
    }

    private static Api.Options.CellPos posToGrid(Api.Options options, Api.Vec2 pos) {
        return new Api.Options.CellPos(
                (int) ((pos.x + options.cellSize / 2f) / options.cellSize),
                (int) ((pos.y + options.cellSize / 2f) / options.cellSize)
        );
    }

    private static Api.Vec2 gridToPos(Api.Options options, Api.Options.CellPos p) {
        return new Api.Vec2(
                p.x * options.cellSize,
                p.y * options.cellSize
        );
    }

    private static Api.Vec2 calculateDirectionVector(Api.Vec2 point1, Api.Vec2 point2) {
        float dx = point2.x - point1.x;
        float dy = point2.y - point1.y;
        return new Api.Vec2(dx, dy);
    }

    private static Api.Vec2 normalizeVector(Api.Vec2 vector) {
        float length = (float) Math.sqrt(vector.x * vector.x + vector.y * vector.y);
        return new Api.Vec2(vector.x / length, vector.y / length);
    }
}