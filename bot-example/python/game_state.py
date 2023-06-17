from enum import Enum
from typing import List, Optional, Tuple
import base64


class GameResult(Enum):
    DRAW = 0,
    WIN = 1,
    LOSE = 2


def game_result_from_str(s: str) -> GameResult:
    if s == 'Draw':
        return GameResult.DRAW
    if s == 'Win':
        return GameResult.WIN
    if s == 'Defeat':
        return GameResult.LOSE
    raise Exception(f"Unknown game result: {s}.")


class Drone:
    def __init__(self, json: Optional[dict] = None):
        self.pos_x: float = 0
        self.pos_y: float = 0
        self.angle: float = 0
        self.next_checkpoint_index = 0
        if json is not None:
            self.from_json(json)

    def from_json(self, json: dict):
        self.pos_x = json['pos']['x']
        self.pos_y = json['pos']['y']
        self.angle = json['angle']
        self.next_checkpoint_index = json['next_checkpoint']


class Maze:
    def __init__(self, json: Optional[dict]):
        self.width = 0
        self.height = 0
        self.walls: List[List[bool]] = []
        self.checkpoints: List[Tuple[int, int]] = []
        if json is not None:
            self.from_json(json)

    def from_json(self, json: dict):
        self.width = json['width']
        self.height = json['height']
        self.walls_from_bytes(base64.b64decode(json['walls']))
        self.checkpoints.clear()
        for point in json['checkpoints']:
            self.checkpoints.append((point['x'], point['y']))

    def walls_from_bytes(self, walls: bytes):
        x = 0
        y = self.height - 1
        self.walls = [[False for _ in range(self.height)] for _ in range(self.width)]
        for by in walls:
            for i in range(8):
                self.walls[x][y] = (by & (1 << i)) > 0
                x += 1
                if x >= self.width:
                    x = 0
                    y -= 1

    def print(self):
        symbols = '#═║╗══╔╦║╝║╣╚╩╠╬'
        offsets = ((-1, 0), (0, -1), (1, 0), (0, 1))
        for y in range(self.height - 1, -1, -1):
            line = ""
            for x in range(self.width):
                if self.walls[x][y]:
                    symbol_index = 0
                    for i in range(4):
                        if self.is_wall(x + offsets[i][0], y + offsets[i][1]):
                            symbol_index += 1 << i
                    line += symbols[symbol_index]
                else:
                    if (x, y) in self.checkpoints:
                        checkpoint_index = self.checkpoints.index((x, y))
                        line += str(min(checkpoint_index, 9))
                    else:
                        line += ' '
            print(line)

    def is_wall(self, x: int, y: int, default: bool = False) -> bool:
        if x < 0 or x >= self.width or y < 0 or y >= self.height:
            return default
        return self.walls[x][y]


class GameOptions:
    def __init__(self, json: dict):
        self.maze: Maze = Maze(json['maze'])
        self.cell_size = float(json['cellSize'])
        self.drone_width = float(json['drone']['width'])
        self.drone_height = float(json['drone']['height'])
        self.drone_weight = float(json['drone']['weight'])
        self.drone_max_force = float(json['drone']['maxForce'])
        self.drone_max_torque = float(json['drone']['maxTorque'])
        self.max_ticks = int(json['maxTicks'])


class GameState:
    def __init__(self, json: Optional[dict] = None):
        self.tick_id = 0
        self.drones: List[Drone] = []
        self.my_drone_index = -1
        if json is not None:
            self.from_json(json)

    def from_json(self, json: dict):
        self.tick_id = json['tick_id']

        self.drones.clear()
        for idx, player in enumerate(json['players']):
            self.drones.append(Drone(player['drone']))
            if player.get('is_me', False):
                self.my_drone_index = idx


class GameAction:
    def __init__(self, acc_x: float, acc_y: float, torque: float):
        self.acc_x = acc_x
        self.acc_y = acc_y
        self.torque = torque
