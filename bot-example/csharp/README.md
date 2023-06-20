## Description

This is an example of a bot for the Drones game on the bot-games.fun platform.

The bot searches for the shortest path to the next checkpoint (using BFS) and moves towards it with maximum acceleration.


## Getting Started

You need to have [dotnet 7](https://dotnet.microsoft.com/en-us/download/dotnet/7.0) installed.


## Usage

```shell
CSharp.exe <token> <host> [--debug | --release]
```

Where

**token** is your token from https://bot-games.fun/profile for games on this platform or any integer for local games

**host** is https://api.bot-games.fun for games on site or address of your localrunner

**--debug** is debug mode

