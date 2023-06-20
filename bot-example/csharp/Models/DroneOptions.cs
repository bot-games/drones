using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace CSharp.Models
{
    public record class DroneOptions
    {
        [JsonPropertyName("width")]
        public float Width { get; init; }

        [JsonPropertyName("height")]
        public float Height { get; init; }

        [JsonPropertyName("weight")]
        public float Weight { get; init; }

        [JsonPropertyName("maxForce")]
        public float MaxForce { get; init; }

        [JsonPropertyName("maxTorque")]
        public float MaxTorque { get; init; }
    }
}
