## Description

An example of a bot for the Drones game on the bot-games.fun platform.

The bot is looking for the shortest path to the next checkpoint (using BFS) and goes to it with maximum acceleration.

## Run

You need **python** installed.

To run in infinite mode with default parameters, just run:

`python main.py TOKEN`

where **TOKEN** is your token from profile https://bot-games.fun/profile

To find out more parameters, use the -h parameter:

`python main.py -h`

Another example. Run only one game in debug mode with a detailed log:

`python main.py --debug --games 1 --verbose TOKEN`

## Files

- `bot.py` - contains the logic of the bot. To write your bot, change this file.
- `api.py` - contains the functions of connecting to the server via the bot-games.fun API.
- `game_state.py` - contains classes for the Drones game.
- `main.py` - the main file with the game cycle.
