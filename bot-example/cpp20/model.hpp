#pragma once

#include "geom/vector.hpp"

#include <nlohmann/json.hpp>
#include <eropsergeev/jsonStructs.hpp>
#include <tomykaira/base64.hpp>

#include <vector>
#include <string>
#include <string_view>
#include <iostream>

JSON_SERIALIZABLE_STRUCT(JoinReq,
    JSON_PROPERTY(bool, debug);
    JSON_PROPERTY(std::string_view, token);
);

JSON_SERIALIZABLE_STRUCT(DroneConfig,
    JSON_PROPERTY(float, height);
    JSON_PROPERTY(float, maxForce);
    JSON_PROPERTY(float, weight);
    JSON_PROPERTY(float, width);
);

struct Walls {
    std::vector<char> data;
    size_t height, width;
    auto &operator[](geom::Vec2u coord) {
        auto [x, y] = coord;
        return data[(height - 1 - y) * width + x];
    }
    const auto &operator[](geom::Vec2u coord) const {
        auto [x, y] = coord;
        return data[(height - 1 - y) * width + x];
    }
};

JSON_SERIALIZABLE_STRUCT(MazeConfig,
    JSON_PROPERTY(std::vector<geom::Vec2u>, checkpoints);
    JSON_PROPERTY(Walls, walls);
);

template<>
inline void json_struct::deserialize<MazeConfig, offsetof(MazeConfig, walls)>(MazeConfig &out, const nlohmann::json &j) {
    static macaron::Base64 base64;
    auto &ret = out.walls;
    auto bits = base64.Decode(j["walls"].get<std::string>());
    ret.height = j["height"].get<size_t>();
    ret.width = j["width"].get<size_t>();
    ret.data.resize(ret.height * ret.width);
    for (size_t i = 0; i < ret.width * ret.height; ++i) {
        ret.data[i] = bits[i / 8] >> (i % 8) & 1;
    }
    deserialize<MazeConfig, offsetof(MazeConfig, walls) + sizeof(std::string)>(out, j);
}

JSON_SERIALIZABLE_STRUCT(Config,
    JSON_PROPERTY(unsigned, cellSize);
    JSON_PROPERTY(DroneConfig, drone);
    JSON_PROPERTY(unsigned, maxTicks);
    JSON_PROPERTY(MazeConfig, maze);
);

JSON_SERIALIZABLE_STRUCT(JoinGame,
    JSON_PROPERTY(std::string, id);
    JSON_PROPERTY(Config, options);
);

JSON_SERIALIZABLE_STRUCT(RejoinReq,
    JSON_PROPERTY(std::string_view, game_id);
    JSON_PROPERTY(std::string_view, token);
);

JSON_SERIALIZABLE_STRUCT(RejoinGame,
    JSON_PROPERTY(Config, options);
);

JSON_SERIALIZABLE_STRUCT(WaitTurnReq,
    JSON_PROPERTY(std::string_view, game_id);
    JSON_PROPERTY(std::string_view, token);
);

JSON_SERIALIZABLE_STRUCT(Drone, 
    JSON_PROPERTY(float, angle);
    JSON_PROPERTY(geom::Vec2f, pos);
    JSON_PROPERTY(unsigned, next_checkpoint);
);

JSON_SERIALIZABLE_STRUCT(Player,
    JSON_PROPERTY(bool, is_me);
    JSON_PROPERTY(Drone, drone);
);

JSON_SERIALIZABLE_STRUCT(ApplyForce,
    JSON_PROPERTY(float, x);
    JSON_PROPERTY(float, y);
    JSON_PROPERTY(std::string_view, game_id);
    JSON_PROPERTY(std::string_view, token);
);

template<>
inline void json_struct::deserialize<Player, offsetof(Player, is_me)>(Player &out, const nlohmann::json &j) {
    auto it = j.find("is_me");
    out.is_me = it != j.end() && it->get<bool>();
    deserialize<Player, offsetof(Player, is_me) + sizeof(bool)>(out, j);
}

JSON_SERIALIZABLE_STRUCT(WaitTurnResp,
    JSON_PROPERTY(std::vector<Player>, players);
    JSON_PROPERTY(unsigned, tick_id);
);

JSON_SERIALIZABLE_STRUCT(Error,
    JSON_PROPERTY(std::string, code);
    JSON_PROPERTY(std::optional<std::string>, data);
    JSON_PROPERTY(std::string, message);
);

inline std::ostream &operator<<(std::ostream &out, const Error &err) {
    out << err.code << "\n";
    if (err.data) {
        out << *err.data << "\n";
    } else {
        out << "<no data>\n";
    }
    out << err.message << "\n";
    return out;
}
