import java.net.SocketTimeoutException
import kotlin.math.*
import kotlin.random.Random
import kotlin.random.nextUInt


fun main(args: Array<String>) {

    //val apiUrl = "http://localhost:10000/game"        // localrunner
     val apiUrl = "https://api.bot-games.fun/game/drones" // production

    //val apiToken = Random.nextUInt().toString()  // localrunner
    val apiToken = "TOKEN FROM https://bot-games.fun/profile"  // production
    var apiGameId: String? = null
    val apiDebug = false   // true for game against SmartGuy (dummy bot), false for game against other players

    val api = Api(apiUrl)

    var game: Api.Game

    @Suppress("KotlinConstantConditions")
    if (apiGameId != null) {
        println("Rejoin ongoing game with specified id $apiGameId")
        game = api.rejoin(apiToken, apiGameId)
    } else {
        println("Waiting for game to start...")
        while (true) {   // retry on timeout
            try {
                game = api.join(apiToken, apiDebug)
                break
            } catch (e: Throwable) {
                when {
                    e is GameServerError
                            && e.error.code == "AlreadyInGame"
                            && e.error.data is String -> {
                        println("Rejoin ongoing game ${e.error.data}")
                        apiGameId = e.error.data
                        game = api.rejoin(apiToken, apiGameId)
                        break
                    }

                    e is SocketTimeoutException -> {
                        println("Join timeout, sleep and retrying...")
                        Thread.sleep(500)
                    }

                    else -> throw e
                }
            }
        }
    }

    val gameOptions = game.options

    val actualGameId = apiGameId ?: game.id

    while (true) {
        val gameState: Api.GameState

        try {
            println(" Waiting for turn...")
            gameState = api.waitTurn(apiToken, actualGameId)
            val tickId = gameState.tickId
            println("$tickId got turn state")
        } catch (e: Throwable) {
            if (e is GameServerError && e.error.code == "GameFinished") {
                val gameResult = e.error.data ?: "?"
                val iWinGame = e.error.data == "Win"
                println("Game finished with result=$gameResult iWinGame=$iWinGame")

                println("Production game replay " + apiUrl.replace("api.", "") + "/battle/" + game.id);
                println("Localrunner game replay " + apiUrl.replace("/game", "") + "/battle/" + game.id);
                break
            }
            throw e
        }

        for (player in gameState.players) {
            if (player.isMe) {
                val drone = player.drone
                val nextCellPoint = gameOptions.maze.checkpoints[drone.nextCheckpointIndex]
                val path = PathFinding.solve(
                    gameOptions.maze,
                    posToGrid(gameOptions, drone.pos),
                    nextCellPoint
                )

                if (path.size > 1) {
                    val goal = path[1];
                    val nextPoint = gridToPos(gameOptions, goal)
                    val force = normalizeVector(calculateDirectionVector(drone.pos, nextPoint))
                    api.applyForce(apiToken, actualGameId, force.x * 500, force.y * 500)
                } else {
                    api.applyForce(apiToken, actualGameId, 0F, 0F)
                }
            }
        }
        Thread.sleep(30)
    }
}

fun posToGrid(options: Api.Options, pos: Api.Vec2): Api.Options.CellPos {
    return Api.Options.CellPos(
        ((pos.x + options.cellSize.toFloat() / 2) / options.cellSize.toFloat()).toInt(),
        ((pos.y + options.cellSize.toFloat() / 2) / options.cellSize.toFloat()).toInt()
    )
}

fun gridToPos(options: Api.Options, p: Api.Options.CellPos): Api.Vec2 {
    return Api.Vec2(
        p.x.toFloat() * options.cellSize.toFloat(),
        p.y.toFloat() * options.cellSize.toFloat()
    )
}

fun calculateDirectionVector(point1: Api.Vec2, point2: Api.Vec2): Api.Vec2 {
    val dx = point2.x - point1.x
    val dy = point2.y - point1.y
    return Api.Vec2(dx, dy)
}

fun normalizeVector(vector: Api.Vec2): Api.Vec2 {
    val magnitude = sqrt(vector.x * vector.x + vector.y * vector.y)
    return if (magnitude != 0F) Api.Vec2(vector.x / magnitude, vector.y / magnitude) else Api.Vec2(0F, 0F)
}
