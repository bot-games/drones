package org.example;

import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

public class PathFinding {
    public static List<Api.Options.CellPos> solve(Api.Options.Maze maze, Api.Options.CellPos start, Api.Options.CellPos goal) {
        ArrayDeque<Api.Options.CellPos> queue = new ArrayDeque<>();
        Set<Api.Options.CellPos> visited = new java.util.HashSet<>();
        Map<Api.Options.CellPos, Api.Options.CellPos> prev = new HashMap<>();
        queue.add(start);
        visited.add(start);

        while (!queue.isEmpty()) {
            Api.Options.CellPos current = queue.removeFirst();
            if (current.equals(goal)) {
                List<Api.Options.CellPos> path = new ArrayList<>();

                Api.Options.CellPos cur = current;
                while (!cur.equals(start)) {
                    path.add(cur);
                    cur = prev.get(cur);
                }
                path.add(cur);
                Collections.reverse(path);
                return path;
            }

            for (Api.Options.CellPos next : getNeighbors(maze, current)) {
                if (!visited.contains(next)) {
                    queue.add(next);
                    visited.add(next);
                    prev.put(next, current);
                }
            }
        }

        return Collections.emptyList();
    }

    private static List<Api.Options.CellPos> getNeighbors(Api.Options.Maze maze, Api.Options.CellPos current) {
        int width = maze.width;
        int height = maze.height;
        int x = current.x;
        int y = current.y;

        List<Api.Options.CellPos> neighbors = new ArrayList<>();
        if (x > 0 && !maze.isWall(x - 1, y)) {
            neighbors.add(new Api.Options.CellPos(x - 1, y));
        }
        if (x < width - 1 && !maze.isWall(x + 1, y)) {
            neighbors.add(new Api.Options.CellPos(x + 1, y));
        }
        if (y > 0 && !maze.isWall(x, y - 1)) {
            neighbors.add(new Api.Options.CellPos(x, y - 1));
        }
        if (y < height - 1 && !maze.isWall(x, y + 1)) {
            neighbors.add(new Api.Options.CellPos(x, y + 1));
        }

        return neighbors;
    }
}

