## Description

This is an example of a bot for the Drones game on the bot-games.fun platform.

The bot searches for the shortest path to the next checkpoint (using BFS) and moves towards it with maximum acceleration.

## Getting Started

You need to have **python** installed.

To run the bot in infinite mode with default parameters, just execute:

`python main.py TOKEN`

where **TOKEN** is your token from https://bot-games.fun/profile

For more options, use the -h parameter:

`python main.py -h`

For example, to run only one game in debug mode with detailed logs, run:

`python main.py --debug --games 1 --verbose TOKEN`

## Files

- `bot.py` - contains the bot's logic. To modify the bot's behavior, edit this file.
- `api.py` - contains functions for connecting to the server via the bot-games.fun API.
- `game_state.py` - contains classes for the Drones game.
- `main.py` - the main file with the game loop.
