using CSharp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CSharp
{
    public class PathFinding
    {
        public static List<CellPosition> Solve(Maze maze, CellPosition start, CellPosition goal)
        {
            var queue = new Queue<CellPosition>();
            var visited = new HashSet<CellPosition>();
            var prev = new Dictionary<CellPosition, CellPosition>();

            queue.Enqueue(start);
            visited.Add(start);

            var path = new List<CellPosition>();

            while (queue.Count > 0)
            {
                var current = queue.Dequeue();

                if (current == goal)
                {
                    while (current != start)
                    {
                        path.Add(current);
                        current = prev[current];
                    }
                    path.Add(current);
                    path.Reverse();
                    return path;
                }

                foreach (var next in GetNeighbors(maze, current))
                {
                    if (!visited.Contains(next))
                    {
                        queue.Enqueue(next);
                        visited.Add(next);
                        prev.Add(next, current);
                    }
                }
            }

            return path;
        }

        private static List<CellPosition> GetNeighbors(Maze maze, CellPosition current)
        {
            var width = maze.Width;
            var height = maze.Height;
            var x = current.X;
            var y = current.Y;

            var neighbors = new List<CellPosition>(4);

            if (x > 0 && !maze.IsWall(x - 1, y))
            {
                neighbors.Add(new CellPosition(x - 1, y));
            }
            if (x < width - 1 && !maze.IsWall(x + 1, y))
            {
                neighbors.Add(new CellPosition(x + 1, y));
            }
            if (y > 0 && !maze.IsWall(x, y - 1))
            {
                neighbors.Add(new CellPosition(x, y - 1));
            }
            if (y < height - 1 && !maze.IsWall(x, y + 1))
            {
                neighbors.Add(new CellPosition(x, y + 1));
            }

            return neighbors;
        }
    }
}
