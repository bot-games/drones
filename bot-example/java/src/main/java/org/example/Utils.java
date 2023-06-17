package org.example;

public class Utils {
    public static Api.Options.CellPos posToGrid(Api.Options options, Api.Vec2 pos) {
        return new Api.Options.CellPos(
                (int) ((pos.x + options.cellSize / 2f) / options.cellSize),
                (int) ((pos.y + options.cellSize / 2f) / options.cellSize)
        );
    }

    public static Api.Vec2 gridToPos(Api.Options options, Api.Options.CellPos p) {
        return new Api.Vec2(
                p.x * options.cellSize,
                p.y * options.cellSize
        );
    }

    public static Api.Vec2 calculateDirectionVector(Api.Vec2 point1, Api.Vec2 point2) {
        float dx = point2.x - point1.x;
        float dy = point2.y - point1.y;
        return new Api.Vec2(dx, dy);
    }

    public static Api.Vec2 normalizeVector(Api.Vec2 vector) {
        float length = (float) Math.sqrt(vector.x * vector.x + vector.y * vector.y);
        return new Api.Vec2(vector.x / length, vector.y / length);
    }
}
