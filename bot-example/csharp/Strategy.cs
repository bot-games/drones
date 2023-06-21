using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CSharp.Models;

namespace CSharp
{
    public class Strategy
    {
        private readonly Options _options;

        public Strategy(Options options)
        {
            _options = options;
        }

        public Models.Action GetAction(GameState gameState)
        {
            foreach (var player in gameState.Players)
            {
                if (player.IsMe)
                {
                    var drone = player.Drone;
                    var nextCellPoint = _options.Maze.Checkpoints[drone.NextCheckpointIndex];

                    var path = PathFinding.Solve(
                        _options.Maze,
                        _options.GetCellPosition(drone.Position),
                        nextCellPoint
                    );

                    if (path.Count > 1)
                    {
                        var goal = path[1];

                        var nextPoint = _options
                            .GetPosition(goal)
                            .Subtract(drone.Position)
                            .Normalize();

                        return new Models.Action(nextPoint.X * 500, nextPoint.Y * 500, 0f);
                    }
                }
            }

            return new Models.Action(0f, 0f, 0f);
        }
    }
}
