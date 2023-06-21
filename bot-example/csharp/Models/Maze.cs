using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace CSharp.Models
{
    public record class Maze
    {
        [JsonPropertyName("width")]
        public int Width { get; init; }

        [JsonPropertyName("height")]
        public int Height { get; init; }

        // Bit array of walls (1 - Wall, 0 - Path) encoded to string
        [JsonPropertyName("walls")]
        public string WallsBase64String { get; init; }

        [JsonPropertyName("checkpoints")]
        public CellPosition[] Checkpoints { get; init; }

        private readonly BitArray _walls;

        public Maze(int width, int height, string wallsBase64String, CellPosition[] checkpoints)
        {
            Width = width;
            Height = height;
            WallsBase64String = wallsBase64String;
            Checkpoints = checkpoints;

            _walls = new BitArray(Convert.FromBase64String(WallsBase64String));
        }

        public bool IsWall(int x, int y)
        {
            var i = (Height - y - 1) * Width + x;

            return _walls.Get(i);
        }
    }
}
