using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace CSharp.Models
{
    public record class Game
    {
        [JsonPropertyName("id")]
        public string Id { get; init; }

        [JsonPropertyName("options")]
        public Options Options { get; init; }

        public Game(string id, Options options)
        {
            Id = id;
            Options = options;
        }
    }
}
