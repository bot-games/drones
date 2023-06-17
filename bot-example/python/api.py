import requests
from typing import Optional, Tuple, Union
from game_state import GameOptions, GameState, GameResult, GameAction, game_result_from_str


class Api:
    def __init__(self, api_url: str, api_token: str):
        self.api_url = api_url
        self.api_token = api_token

    def join(self, debug: bool) -> Tuple[Optional[str], Optional[GameOptions]]:
        """
        Join to a game.

        :param debug: Use it for games against SmartGuy. The debug game doesn't affect ratings.
                      There is no time limit for a turn.
        :return: Tuple (game_id: str, game_options: GameOptions).
        """

        url = self.api_url + "/join/v1"
        request = f'{{"debug":{"true" if debug else "false"},"token":"{self.api_token}"}}'
        r = requests.post(url, data=request)

        if r.status_code == 400:
            data = r.json()
            if data['code'] == "AlreadyInGame":
                return data['data'], None

        if r.status_code != 200:
            print(f"Error joining the game. Status code: {r.status_code}.")
            print(r.text)
            return None, None

        data = r.json()
        return data['id'], GameOptions(data['options'])

    def rejoin(self, game_id: str) -> Optional[Union[GameOptions, GameResult]]:
        """
        Join an existing game.

        :return: GameOptions, if the game is not finished or GameResult, if the game is finished. None, if error.
        """

        url = self.api_url + "/rejoin/v1"
        request = f'{{"game_id":"{game_id}","token":"{self.api_token}"}}'
        print(request)
        r = requests.post(url, data=request)

        if r.status_code == 400:
            data = r.json()
            if data['code'] == "GameFinished":
                return game_result_from_str(data['data'])

        if r.status_code != 200:
            print(f"Error rejoining the game. Status code: {r.status_code}.")
            print(r.text)
            return None

        return GameOptions(r.json()['options'])

    def wait_turn(self, game_id: str) -> Optional[Union[GameState, GameResult]]:
        """
        Wait the turn and get the game status.

        :return: GameState, if the game is not finished or GameResult, if the game is finished. None, if error.
        """

        url = self.api_url + "/wait_turn/v1"
        request = f'{{"game_id":"{game_id}","token":"{self.api_token}"}}'
        r = requests.post(url, data=request)

        if r.status_code == 400:
            data = r.json()
            if data['code'] == "GameFinished":
                return game_result_from_str(data['data'])

        if r.status_code != 200:
            print(f"Error waiting the turn. Status code: {r.status_code}.")
            print(r.text)
            return None

        return GameState(r.json())

    def apply_force(self, game_id: str, action: GameAction) -> bool:
        """
        Accelerate the drone.

        :return: True, if ok, False, if error.
        """

        url = self.api_url + "/action/applyforce/v1"
        request = f'{{"game_id":"{game_id}","token":"{self.api_token}","x":{action.acc_x},"y":{action.acc_y},"torque":{action.torque}}}'
        r = requests.post(url, data=request)

        if r.status_code != 200:
            print(f"Error waiting the turn. Status code: {r.status_code}.")
            print(r.text)
            return False

        return True
