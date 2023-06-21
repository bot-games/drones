using CSharp.Models;

namespace CSharp
{
    internal class Program
    {
        static int Main(string[] args)
        {
            if (args.Length < 3)
            {
                Console.WriteLine($"Usage: CSharp.exe <token> <host> [--debug | --release]");
                Console.WriteLine($"Example: CSharp.exe 1 \"http://localhost:10000/game/\" --debug");
                return 1;
            }

            var apiToken = args[0];
            var apiUrl = args[1];
            var isDebug = args[2] == "--debug";

            string? gameId = null;

            var api = new Api(apiUrl);

            var game = JoinGame(apiToken, isDebug, gameId, api);

            if (game == null)
            {
                Console.WriteLine("No game.");
                return 1;
            }

            PlayGame(game, apiToken, api);

            return 0;
        }

        private static Game? JoinGame(string apiToken, bool isDebug, string? gameId, Api api)
        {
            if (gameId != null)
            {
                Console.WriteLine("Rejoin ongoing game with specified id " + gameId);
                return api.Rejoin(apiToken, gameId);
            }
            else
            {
                Console.WriteLine("Waiting for game to start...");

                while (true)
                {
                    try
                    {
                        return api.Join(apiToken, isDebug);
                    }
                    catch (TaskCanceledException)
                    {
                        Console.WriteLine("Join timeout, sleep and retrying...");
                        Thread.Sleep(500);
                    }
                    catch (GameServerErrorException exception) when (exception.Error?.Code == ErrorCodes.AlreadyInGame)
                    {
                        Console.WriteLine("Rejoin ongoing game " + exception.Error.Data);
                        gameId = (string?)exception.Error.Data;

                        if (gameId != null)
                        {
                            return api.Rejoin(apiToken, gameId);
                        }

                        break;
                    }
                }
            }

            return null;
        }

        private static void PlayGame(Game game, string apiToken, Api api)
        {
            var strategy = new Strategy(game.Options);

            while (true)
            {
                try
                {
                    Console.WriteLine(" Waiting for turn...");
                    var gameState = api.WaitTurn(apiToken, game.Id);
                    Console.WriteLine(gameState.TickId + " Turn received");

                    var action = strategy.GetAction(gameState);

                    api.ApplyForce(apiToken, game.Id, action);
                }
                catch (GameServerErrorException exception) when (exception.Error?.Code == ErrorCodes.GameFinished)
                {
                    var gameResult = exception.Error.Data ?? "?";
                    var iWinGame = exception.Error.Data != null && exception.Error.Data.ToString() == "Win";

                    Console.WriteLine("Game finished with result=" + gameResult + " iWinGame=" + iWinGame);

                    Console.WriteLine("Production game replay " + api.BaseUrl.Replace("api.", "") + "/battle/" + game.Id);
                    Console.WriteLine("Localrunner game replay " + api.BaseUrl.Replace("/game", "") + "/battle/" + game.Id);
                    break;
                }
            }
        }
    }
}