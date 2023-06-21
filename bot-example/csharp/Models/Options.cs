using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace CSharp.Models
{
    public record class Options
    {
        [JsonPropertyName("maze")]
        public required Maze Maze { get; init; }

        [JsonPropertyName("cellSize")]
        public int CellSize { get; init; }

        [JsonPropertyName("drone")]
        public required DroneOptions Drone { get; init; }

        [JsonPropertyName("maxTicks")]
        public int MaxTicks { get; init; }

        public CellPosition GetCellPosition(Vector2d position)
        {
            return new CellPosition(
                (int)((position.X + CellSize / 2f) / CellSize),
                (int)((position.Y + CellSize / 2f) / CellSize)
            );
        }

        public Vector2d GetPosition(CellPosition position)
        {
            return new Vector2d(
                position.X * CellSize,
                position.Y * CellSize
            );
        }
    }
}
