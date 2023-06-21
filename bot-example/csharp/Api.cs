using CSharp.Models;
using System;
using System.Net;
using System.Net.Mime;
using System.Text;
using System.Text.Json;

namespace CSharp
{
    public class Api
    {
        private readonly HttpClient _httpClient;

        public string BaseUrl { get; init; }

        public Api(string baseUrl)
        {
            BaseUrl = baseUrl;

            var header = new HttpClientHandler()
            {
                AutomaticDecompression = DecompressionMethods.GZip | DecompressionMethods.Deflate
            };

            _httpClient = new HttpClient(header)
            {
                BaseAddress = new Uri(BaseUrl),
            };
        }

        public Game Join(string token, bool debug)
        {
            return SendRequest<Game>("join/v1", new { token, debug });
        }

        public Game Rejoin(string token, string gameId)
        {
            return SendRequest<Game>("rejoin/v1", new { token, game_id = gameId });
        }

        public GameState WaitTurn(string token, string gameId)
        {
            return SendRequest<GameState>("wait_turn/v1", new { token, game_id = gameId });
        }

        public void ApplyForce(string token, string gameId, Models.Action action)
        {
            SendRequest("action/applyforce/v1", new { token, game_id = gameId, x = action.X, y = action.Y, torque = action.Torque });
        }

        private TResult SendRequest<TResult>(string relativeUrl, object bodyObject)
        {
            using var requestMessage = new HttpRequestMessage(HttpMethod.Post, relativeUrl);
            requestMessage.Content = new StringContent(JsonSerializer.Serialize(bodyObject), Encoding.UTF8, MediaTypeNames.Application.Json);

            using var responseMessage = _httpClient.Send(requestMessage);

            var content = responseMessage.Content.ReadAsStream();

            if (responseMessage.IsSuccessStatusCode)
            {
                return JsonSerializer.Deserialize<TResult>(content) 
                    ?? throw new GameServerErrorException(new Error { Code = "-1", Message = "Missing result." });
            }
            else
            {
                throw new GameServerErrorException(JsonSerializer.Deserialize<Error>(content));
            }
        }

        private void SendRequest(string relativeUrl, object bodyObject)
        {
            using var requestMessage = new HttpRequestMessage(HttpMethod.Post, relativeUrl);
            requestMessage.Content = new StringContent(JsonSerializer.Serialize(bodyObject), Encoding.UTF8, MediaTypeNames.Application.Json);

            using var responseMessage = _httpClient.Send(requestMessage);

            if (!responseMessage.IsSuccessStatusCode)
            {
                var content = responseMessage.Content.ReadAsStream();
                throw new GameServerErrorException(JsonSerializer.Deserialize<Error>(content));
            }
        }
    }
}
