package org.example;

import java.io.IOException;
import java.util.*;

import com.google.gson.Gson;
import com.google.gson.annotations.SerializedName;

import okhttp3.MediaType;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;

public class Api {
    private final String baseUrl;
    private final OkHttpClient client;
    private final Gson gson;

    public Api(String baseUrl) {
        this.baseUrl = baseUrl;
        this.client = new OkHttpClient.Builder()
                .build();
        this.gson = new Gson();
    }

    public static class Game {
        @SerializedName("id")
        public String id;

        @SerializedName("options")
        public Options options;

        public Game(String id, Options options) {
            this.id = id;
            this.options = options;
        }
    }

    public static class GameState {
        @SerializedName("tick_id")
        public int tickId;

        @SerializedName("players")
        public List<Player> players;

        public static class Player {
            @SerializedName("is_me")
            public boolean isMe;

            @SerializedName("drone")
            public Drone drone;
        }

        public static class Drone {
            @SerializedName("pos")
            public Vec2 pos;

            @SerializedName("angle")
            public float angle;

            @SerializedName("next_checkpoint")
            public int nextCheckpointIndex;
        }
    }

    public static class Vec2 {
        @SerializedName("x")
        public float x;

        @SerializedName("y")
        public float y;

        public Vec2(float x, float y) {
            this.x = x;
            this.y = y;
        }

        public Vec2(Vec2 source) {
            this.x = source.x;
            this.y = source.y;
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;
            Vec2 vec2 = (Vec2) o;
            return Float.compare(vec2.x, x) == 0 && Float.compare(vec2.y, y) == 0;
        }

        @Override
        public int hashCode() {
            return Objects.hash(x, y);
        }

        @Override
        public String toString() {
            return "Vec2{" +
                    "x=" + x +
                    ", y=" + y +
                    '}';
        }
    }

    public static class Error {
        @SerializedName("code")
        public String code;

        @SerializedName("message")
        public String message;

        @SerializedName("data")
        public Object data;
    }

    public static class Options {
        @SerializedName("maze")
        public Maze maze;

        @SerializedName("cellSize")
        public int cellSize;

        @SerializedName("drone")
        public Options.Drone drone;

        @SerializedName("maxTicks")
        public int maxTicks;


        public static class CellPos {
            @SerializedName("x")
            public int x;

            @SerializedName("y")
            public int y;

            public CellPos(int x, int y) {
                this.x = x;
                this.y = y;
            }

            @Override
            public boolean equals(Object o) {
                if (this == o) return true;
                if (o == null || getClass() != o.getClass()) return false;
                CellPos cellPos = (CellPos) o;
                return x == cellPos.x && y == cellPos.y;
            }

            @Override
            public int hashCode() {
                return Objects.hash(x, y);
            }

            @Override
            public String toString() {
                return "CellPos{" +
                        "x=" + x +
                        ", y=" + y +
                        '}';
            }
        }

        public static class Maze {
            @SerializedName("width")
            public final int width;

            @SerializedName("height")
            public final int height;

            // Bit array of walls (1 - Wall, 0 - Path) encoded to string
            @SerializedName("walls")
            public final String wallsBase64String;
            @SerializedName("checkpoints")
            public final List<CellPos> checkpoints;

            private transient byte[] walls;

            public Maze(int width, int height, String wallsBase64String, List<CellPos> checkpoints) {
                this.width = width;
                this.height = height;
                this.wallsBase64String = wallsBase64String;
                this.checkpoints = checkpoints;
            }

            public byte[] getWalls() {
                // decode base64 string to byte array
                if (walls == null) {
                    walls = Base64.getDecoder().decode(wallsBase64String);
                }

                return walls;
            }

            public boolean isWall(int x, int y) {
                int i = ((height - y - 1) * width + x);
                int byteIndex = i / 8;
                int bitIndex = i % 8;
                return ((int) getWalls()[byteIndex] & (1 << bitIndex)) != 0;
            }
        }

        public class Drone {
            @SerializedName("width")
            public float width;
            @SerializedName("height")
            public float height;
            @SerializedName("weight")
            public float weight;
            @SerializedName("maxForce")
            public float maxForce;
            @SerializedName("maxTorque")
            public float maxTorque;
        }
    }

    public Game join(String token, boolean debug) {
        return call(
                baseUrl + "/join/v1",
                Map.of(
                        "token", token,
                        "debug", debug
                ),
                Game.class
        );
    }

    public Game rejoin(String token, String apiGameId) {
        return call(
                baseUrl + "/rejoin/v1",
                Map.of(
                        "token", token,
                        "game_id", apiGameId
                ),
                Game.class
        );
    }

    public GameState waitTurn(String token, String gameId) {
        return call(
                baseUrl + "/wait_turn/v1",
                Map.of(
                        "token", token,
                        "game_id", gameId
                ),
                GameState.class
        );
    }

    public void applyForce(String token, String gameId, float x, float y, float torque) {
        call(
                baseUrl + "/action/applyforce/v1",
                Map.of(
                        "token", token,
                        "game_id", gameId,
                        "x", x,
                        "y", y,
                        "torque", torque
                ),
                Object.class
        );
    }

    private <T> T call(String url, Object bodyObject, Class<T> responseClass) {
        String jsonBody = gson.toJson(bodyObject);
        RequestBody body = RequestBody.create(jsonBody, MediaType.get("application/json"));

        Request request = new Request.Builder()
                .url(url)
                .post(body)
                .build();
        try (Response response = client.newCall(request).execute()) {

            if (response.body() != null) {
                String bodyAsString = Objects.requireNonNull(response.body()).string();
                if (response.isSuccessful()) {
                    return gson.fromJson(bodyAsString, responseClass);
                }
                try {
                    Error error = gson.fromJson(bodyAsString, Error.class);
                    if (error != null) {
                        throw new GameServerError(error);
                    }
                } catch (Exception e) {
                    if (e instanceof GameServerError) {
                        throw e;
                    }
                    e.printStackTrace();
                    throw new RuntimeException(String.format("Failed request=%s, error code=%d response=%s", url, response.code(), bodyAsString));
                }

            }

            throw new IOException(String.format("Network Error, no body=%d", response.code()));
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

}
