import argparse
from api import Api
from game_state import GameResult, GameOptions
from bot import Bot


def play_one_game(api: Api, bot: Bot, debug: bool, verbose_log: bool) -> bool:
    print("Joining the game...")
    game_id, game_options = api.join(debug)
    if game_id is None:
        return False
    if game_options is None:
        print("Rejoining...")
        r = api.rejoin(game_id)
        if isinstance(r, GameResult):
            print(f"Game finished. {r}")
            return True
        if isinstance(r, GameOptions):
            game_options = r
        else:
            return False

    print(f"Joined! Game id: {game_id}.")

    bot.reset()
    bot.start_game(game_options)
    game_options.maze.print()

    while True:
        if verbose_log:
            print("Waiting for turn...")
        r = api.wait_turn(game_id)
        if isinstance(r, GameResult):
            print(f"Game finished. {r}")
            return True
        if r is None:
            return False

        game_state = r
        action = bot.get_action(game_state)
        if verbose_log:
            print(f"Tick: {game_state.tick_id}. Force: {action.acc_x}, {action.acc_y}")
        if not api.apply_force(game_id, action):
            return False


def main(api_token: str, api_url: str, debug: bool, games: int, verbose_log: bool):
    api = Api(api_url, api_token)
    bot = Bot()

    infinity_play = games == 0
    games_remain = 1 if infinity_play else games
    while games_remain > 0:
        if not play_one_game(api, bot, debug, verbose_log):
            break
        if not infinity_play:
            games_remain -= 1


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description="Launch a bot for bot-games.fun")
    parser.add_argument("token", type=str, help="User bot token from profile https://bot-games.fun/profile")
    parser.add_argument("--api_url", type=str, dest="api_url", default="https://api.bot-games.fun/game/drones",
                        help="API address of the game. (Default: https://api.bot-games.fun/game/drones)")
    parser.add_argument("--debug", dest="debug", action='store_true', default=False,
                        help="Use it for games against SmartGuy. The debug game doesn't affect ratings. "
                             "There is no time limit for a turn. (Default: False)")
    parser.add_argument("--games", type=int, default=0,
                        help="Number of games to be played. If 0, then infinite. (Default: 0)")
    parser.add_argument("--verbose", dest="verbose", action='store_true', default=False,
                        help="Print debug messages for every tick. (Default: False)")
    args = parser.parse_args()

    main(args.token, args.api_url, args.debug, args.games, args.verbose)
