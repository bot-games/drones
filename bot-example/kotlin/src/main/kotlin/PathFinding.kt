class PathFinding {
    companion object {
        fun solve(
            maze: Api.Options.Maze,
            start: Api.Options.CellPos,
            goal: Api.Options.CellPos
        ): List<Api.Options.CellPos> {
            val queue = ArrayDeque<Api.Options.CellPos>()
            val visited = mutableSetOf<Api.Options.CellPos>()
            val prev = mutableMapOf<Api.Options.CellPos, Api.Options.CellPos>()

            queue.add(start)
            visited.add(start)

            while (queue.isNotEmpty()) {
                val current = queue.removeFirst()
                if (current == goal) {
                    val path = mutableListOf<Api.Options.CellPos>()

                    var cur = current
                    while (cur != start) {
                        path.add(cur)
                        cur = prev[cur]!!
                    }
                    path.add(cur)
                    path.reverse()
                    return path
                }

                for (next in getNeighbors(maze, current)) {
                    if (next !in visited) {
                        queue.add(next)
                        visited.add(next)
                        prev[next] = current
                    }
                }
            }

            return emptyList()
        }

        private fun getNeighbors(maze: Api.Options.Maze, current: Api.Options.CellPos): List<Api.Options.CellPos> {
            val width = maze.width
            val height = maze.height
            val x = current.x
            val y = current.y

            val neighbors = mutableListOf<Api.Options.CellPos>()
            if (x > 0 && maze.isWall(x - 1, y).not()) {
                neighbors.add(Api.Options.CellPos(x - 1, y))
            }
            if (x < width - 1 && maze.isWall(x + 1, y).not()) {
                neighbors.add(Api.Options.CellPos(x + 1, y))
            }
            if (y > 0 && maze.isWall(x, y - 1).not()) {
                neighbors.add(Api.Options.CellPos(x, y - 1))
            }
            if (y < height - 1 && maze.isWall(x, y + 1).not()) {
                neighbors.add(Api.Options.CellPos(x, y + 1))
            }

            return neighbors
        }
    }
}

