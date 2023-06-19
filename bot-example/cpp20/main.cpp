#include "model.hpp"
#include "result.hpp"
#include "pathfind.hpp"

#define CPPHTTPLIB_OPENSSL_SUPPORT
#include <yhirose/httplib.h>

#include <nlohmann/json.hpp>
#include <eropsergeev/jsonStructs.hpp>
#include <box2d/b2_world.h>

#include <iostream>
#include <string>
#include <string_view>
#include <optional>
#include <limits>

using namespace std;

using json_struct::serialize;
using json_struct::deserialize;

static string_view api_token;
static string current_game_id;
static string host;
static string prefix;
bool is_debug = 0;

std::optional<httplib::Client> cli;

template<class T>
using PostResult = Result<T, Error>;

auto post_with_retrys(const string &path, const string &data) {
    while (1) {
        auto res = cli->Post(path, data, "application/json");
        if (!res) {
            cerr << "Error: " << res.error() << "\n";
        } else if (res->status != 200 && res->status != 400) {
            cerr << "Unexpected status: " << res->status << "\n";
            cerr << "Response: " << res->body << "\n";
        } else {
            return res;
        }
        cerr << "Retry...\n";
        this_thread::sleep_for(1s);
    }
}

template<class Resp = void, class Req = void>
PostResult<Resp> post(const string &ep, const Req &data) {
    auto res = post_with_retrys(prefix + ep, serialize(data).dump());
    if (res->status == 400) {
        return PostResult<Resp>{deserialize<Error>(nlohmann::json::parse(res->body))};
    } else if (res->status == 200) {
        if constexpr (!is_void_v<Resp>) {
            return PostResult<Resp>{deserialize<Resp>(nlohmann::json::parse(res->body))};
        } else {
            return PostResult<Resp>{};
        }
    } else {
        cerr << "Unexpected status: " << res->status << "\n";
        cerr << res->body << "\n";
        abort();
    }
    if (res->status == 400) {
        return PostResult<Resp>{deserialize<Error>(nlohmann::json::parse(res->body))};
    } else if (res->status == 200) {
        if constexpr (!is_void_v<Resp>) {
            return PostResult<Resp>{deserialize<Resp>(nlohmann::json::parse(res->body))};
        } else {
            return PostResult<Resp>{};
        }
    } else {
        cerr << "Unexpected status: " << res->status << "\n";
        cerr << res->body << "\n";
        abort();
    }
}

ApplyForce makeApplyForce(geom::Vec2f f) {
    return ApplyForce{f.x, f.y, current_game_id, api_token};
}

Config joinGame() {
    auto join = post<JoinGame>("/join/v1", JoinReq{is_debug, api_token});
    if (join.isError()) {
        current_game_id = *move(join).getError().data;
        return move(post<RejoinGame>("/rejoin/v1", RejoinReq{current_game_id, api_token}).get().options);
    } else {
        auto ret = move(join).get();
        current_game_id = ret.id;
        return move(ret.options);
    }
}

int main(int argc, const char **argv) {
    if (argc < 4) {
        cerr << "Usage: " << argv[0] << " <TOKEN> <HOST> <PREFIX> [IS_DEBUG] [GAMES]\n";
        return 1;
    }
    api_token = argv[1];
    host = argv[2];
    prefix = argv[3];
    if (argc > 4) {
        is_debug = atoi(argv[4]);
    }
    int games = 1;
    if (argc > 5) {
        games = atoi(argv[5]);
    }

    if (games == 0) {
        games = numeric_limits<int>::max();
    }

    cli.emplace(host);
    cli->set_read_timeout(3600, 0);

    int wins = 0, losses = 0, draws = 0;

    while (games --> 0) {
        auto cfg = joinGame();
        WaitTurnReq req{current_game_id, api_token};
        cout << "Game " << current_game_id << " started!" << endl;
        while (1) {
            auto res = post<WaitTurnResp>("/wait_turn/v1", req);
            if (res.isError()) {
                auto err = move(res).getError();
                cout << err << endl;
                if (!err.data) {
                    cerr << err << "\n";
                    abort(); 
                }
                if (*err.data == "Defeat") {
                    ++losses;
                } else if (*err.data == "Win") {
                    ++wins;
                } else if (*err.data == "Draw") {
                    ++draws;
                } else {
                    cerr << err << "\n";
                    abort(); 
                }
                cout << "Win rate:" << wins << " / (" << wins << " + " << losses << " + " << draws << ") = " << static_cast<double>(wins) / (wins + losses + draws) << endl;
                break;
            }
            const geom::Vec2f shift{cfg.cellSize / 2.f, cfg.cellSize / 2.f};
            auto turn = move(res).get();
            for (auto &p : turn.players) {
                p.drone.pos += shift;
            }
            geom::Vec2f force{};
            for (auto &p : turn.players) {
                if (p.is_me) {
                    geom::Vec2u start(p.drone.pos / cfg.cellSize);
                    geom::Vec2u finish = cfg.maze.checkpoints[p.drone.next_checkpoint];
                    auto path = bfs(cfg.maze.walls, start, finish);
                    if (path.size() > 1) {
                        force = (path[1] + geom::Vec2f(0.5, 0.5) - p.drone.pos / cfg.cellSize) * cfg.drone.maxForce;
                    }
                    break;
                }
            }
            post("/action/applyforce/v1", makeApplyForce(force)).get();
        }
    }
}
