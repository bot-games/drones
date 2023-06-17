import com.google.gson.Gson
import com.google.gson.annotations.SerializedName
import okhttp3.*
import okhttp3.MediaType.Companion.toMediaTypeOrNull
import okhttp3.RequestBody.Companion.toRequestBody
import java.io.IOException
import java.util.*

class Api(val baseUrl: String) {
    private val client = OkHttpClient.Builder()
        .build()
    private val gson = Gson()

    data class Game(
        @SerializedName("id") val id: String,
        @SerializedName("options") val options: Options
    )

    data class GameState(
        @SerializedName("tick_id") val tickId: Int,
        @SerializedName("players") val players: List<Player>
    )

    data class Player(
        @SerializedName("is_me") val isMe: Boolean,
        @SerializedName("drone") val drone: Drone
    )

    data class Drone(
        @SerializedName("pos") val pos: Vec2,
        @SerializedName("angle") val angle: Float,
        @SerializedName("next_checkpoint") val nextCheckpointIndex: Int,
    )

    data class Vec2(
        @SerializedName("x") val x: Float,
        @SerializedName("y") val y: Float
    ) {
        constructor(source: Vec2) : this(source.x, source.y)
    }

    data class Error(
        @SerializedName("code") val code: String?,
        @SerializedName("message") val message: String?,
        @SerializedName("data") val data: Any?
    )

    data class Options(
        @SerializedName("maze")
        val maze: Maze,

        @SerializedName("cellSize")
        val cellSize: Int,

        @SerializedName("drone")
        val drone: Drone,

        @SerializedName("maxTicks")
        val maxTicks: Int
    ) {
        data class CellPos(
            @SerializedName("x")
            val x: Int,

            @SerializedName("y")
            val y: Int
        )

        data class Maze(
            @SerializedName("width")
            val width: Int,

            @SerializedName("height")
            val height: Int,

            // Bit array of walls (1 - Wall, 0 - Path) encoded to string
            @SerializedName("walls")
            val wallsBase64String: String,

            @SerializedName("checkpoints")
            val checkpoints: List<CellPos>
        ) {
            // workaround lazy implementation throws: Cannot invoke "kotlin.Lazy.getValue()" because "<local1>" is null
            @Transient
            private var walls: ByteArray? = null

            fun getWalls(): ByteArray {
                // decode base64 string to byte array
                if (walls == null) {
                    walls = Base64.getDecoder().decode(wallsBase64String)
                }

                return walls!!
            }

        }

        data class Drone(
            @SerializedName("width")
            val width: Float,

            @SerializedName("height")
            val height: Float,

            @SerializedName("weight")
            val weight: Float,

            @SerializedName("maxForce")
            val maxForce: Float,

            @SerializedName("maxTorque")
            val maxTorque: Float
        )
    }

    fun join(token: String, debug: Boolean): Game {
        return call(
            url = "$baseUrl/join/v1",
            bodyObject = mapOf<String, Any?>(
                "token" to token,
                "debug" to debug,
            ),
            responseClass = Game::class.java
        )
    }

    fun rejoin(token: String, apiGameId: String): Game {
        return call(
            url = "$baseUrl/rejoin/v1",
            bodyObject = mapOf<String, Any?>(
                "token" to token,
                "game_id" to apiGameId
            ),
            responseClass = Game::class.java
        )
    }

    fun waitTurn(token: String, gameId: String): GameState {
        return call(
            url = "$baseUrl/wait_turn/v1",
            bodyObject = mapOf<String, Any>(
                "token" to token,
                "game_id" to gameId
            ),
            responseClass = GameState::class.java
        )
    }

    fun applyForce(token: String, gameId: String, x: Float, y: Float, torque: Float) {
        call(
            url = "$baseUrl/action/applyforce/v1",
            bodyObject = mapOf<String, Any>(
                "token" to token,
                "game_id" to gameId,
                "x" to x,
                "y" to y,
                "torque" to torque,
            ),
            responseClass = Unit::class.java
        )
    }

    private fun <T> call(url: String, bodyObject: Any, responseClass: Class<T>): T {
        val jsonBody = gson.toJson(bodyObject)
            .toRequestBody("application/json".toMediaTypeOrNull())

        val request = Request.Builder()
            .url(url)
            .post(jsonBody)
            .build()
        val response = client.newCall(request)
            .execute()

        response.body?.let {
            val bodyAsString = it.string()
            if (response.isSuccessful) {
                return gson.fromJson(bodyAsString, responseClass)
            }
            kotlin.runCatching {
                gson.fromJson(bodyAsString, Error::class.java)!!
            }.onSuccess { error ->
                throw GameServerError(error)
            }.onFailure {
                throw RuntimeException("Failed request=${url}, error code=${response.code} response=$bodyAsString")
            }
        }

        throw IOException("Network Error, no body=${response.code}")
    }
}

fun Api.Options.Maze.isWall(x: Int, y: Int): Boolean {
    val i = ((height.toUInt() - y.toUInt() - 1u) * width.toUInt() + x.toUInt()).toInt()
    val byteIndex = i / 8
    val bitIndex = i % 8
    return getWalls()[byteIndex].toInt() and (1 shl bitIndex) > 0
}
