using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace CSharp.Models
{
    public record class Error
    {
        [JsonPropertyName("code")]
        public required string Code {  get; set; }

        [JsonPropertyName("message")]
        public required string Message { get; set; }

        [JsonPropertyName("data")]
        public object? Data { get; set; }
    }
}
