using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace CSharp.Models
{
    public record class GameState
    {
        [JsonPropertyName("tick_id")]
        public int TickId { get; init; }

        [JsonPropertyName("players")]
        public required Player[] Players { get; init; }
    }
}
