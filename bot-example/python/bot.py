import math
from typing import Optional, Tuple, List
import collections
from game_state import GameOptions, GameState, GameAction


class Bot:
    def __init__(self):
        self.game_options: Optional[GameOptions] = None

    def reset(self) -> None:
        """
        Reset the state and get ready for a new game.
        """

        self.game_options = None

    def start_game(self, options: GameOptions) -> None:
        """
        Prepare for a new game.
        """

        self.game_options = options

    def get_action(self, state: GameState) -> GameAction:
        """
        Calculate the action.
        """

        my_drone = state.drones[state.my_drone_index]
        next_goal = self.game_options.maze.checkpoints[my_drone.next_checkpoint_index]
        path = self.__find_path(self.__pos_to_grid((my_drone.pos_x, my_drone.pos_y)), next_goal)
        if len(path) > 1:
            next_point = self.__grid_to_pos(path[1])
            d_vec = next_point[0] - my_drone.pos_x, next_point[1] - my_drone.pos_y
            force = self.__normalize_vector(d_vec)
            return GameAction(force[0] * 500, force[1] * 500)
        else:
            return GameAction(0, 0)

    def __pos_to_grid(self, pos: Tuple[float, float]) -> Tuple[int, int]:
        cell_size = self.game_options.cell_size
        return int((pos[0] + cell_size / 2) / cell_size), int((pos[1] + cell_size / 2) / cell_size)

    def __grid_to_pos(self, pos: Tuple[int, int]) -> Tuple[float, float]:
        cell_size = self.game_options.cell_size
        return pos[0] * cell_size, pos[1] * cell_size

    @staticmethod
    def __normalize_vector(vector: Tuple[float, float]) -> Tuple[float, float]:
        length = math.sqrt(vector[0] * vector[0] + vector[1] * vector[1])
        return vector[0] / length, vector[1] / length

    def __find_path(self, start: Tuple[int, int], goal: Tuple[int, int]) -> List[Tuple[int, int]]:
        queue = collections.deque([start])
        visited = {start: None}

        while queue:
            cur_node = queue.popleft()
            if cur_node == goal:
                break
            next_nodes = self.__get_neighbors(cur_node)
            for next_node in next_nodes:
                if next_node not in visited:
                    queue.append(next_node)
                    visited[next_node] = cur_node

        path = [goal]
        cur_node = goal
        while cur_node != start:
            cur_node = visited[cur_node]
            path.append(cur_node)
        path.reverse()

        return path

    def __get_neighbors(self, pos: Tuple[int, int]) -> List[Tuple[int, int]]:
        result = []
        offsets = ((-1, 0), (0, -1), (1, 0), (0, 1))
        for ox, oy in offsets:
            if not self.game_options.maze.is_wall(pos[0] - ox, pos[1] - oy, True):
                result.append((pos[0] - ox, pos[1] - oy))
        return result
