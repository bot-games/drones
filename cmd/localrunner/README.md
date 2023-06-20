# Drones LocalRunner

## How to install

* [Install](https://go.dev/dl/) `go` with version 1.19 or upper;
* Clone the project:
```shell
git clone https://github.com/bot-games/drones.git
```
* Build LocalRunner:
Linux
```shell
cd drones
go build -o localrunner cmd/localrunner/main.go
```
Windows
```shell
cd /d C:\repos\drones
go build -o localrunner.exe cmd/localrunner/main.go
```


## How to run
Linux
Run `./localrunner -help` to see options.

Windows
Run `localrunner.exe -help` to see options.

## How to use
By default, LocalRunner listens on http://localhost:10000.
You can open it to have access to Swagger.

Bot API is available by address http://localhost:10000/game.

Your bots must use `uint32` number in string representation as a user token.

Each connected pair of bots starts game immediately. There is no limit for parallels games.

## How to contribute

Send pull requests to the [localrunner library](https://github.com/bot-games/localrunner).