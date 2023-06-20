using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace CSharp.Models
{
    public readonly record struct Vector2d
    {
        [JsonPropertyName("x")]
        public float X { get; init; }

        [JsonPropertyName("y")]
        public float Y { get; init; }

        //[JsonConstructor]
        public Vector2d(float x, float y)
        {
            X = x;
            Y = y;
        }

        public Vector2d(Vector2d source)
        {
            X = source.X;
            Y = source.Y;
        }

        public Vector2d Normalize()
        {
            var length = (float)Math.Sqrt(X * X + Y * Y);

            return new Vector2d(X / length, Y / length);
        }

        public Vector2d Subtract(Vector2d other)
        {
            return new Vector2d(X - other.X, Y - other.Y);
        }
    }
}
