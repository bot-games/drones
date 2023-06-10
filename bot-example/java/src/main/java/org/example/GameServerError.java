package org.example;

public class GameServerError extends RuntimeException {
    final Api.Error error;

    public GameServerError(Api.Error error) {
        this.error = error;
    }

    @Override
    public String getLocalizedMessage() {
        return error.toString();
    }
}
