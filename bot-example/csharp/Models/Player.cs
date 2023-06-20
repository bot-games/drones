using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace CSharp.Models
{
    public record class Player
    {
        [JsonPropertyName("is_me")]
        public bool IsMe { get; init; }

        [JsonPropertyName("drone")]
        public required Drone Drone { get; init; }
    }
}
