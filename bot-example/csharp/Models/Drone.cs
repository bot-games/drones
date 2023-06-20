using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace CSharp.Models
{
    public record class Drone
    {
        [JsonPropertyName("pos")]
        public Vector2d Position { get; init; }

        [JsonPropertyName("angle")]
        public float Angle { get; init; }

        [JsonPropertyName("next_checkpoint")]
        public int NextCheckpointIndex { get; init; }
    }
}
