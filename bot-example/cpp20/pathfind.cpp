#include "pathfind.hpp"

#include <cassert>
#include <algorithm>

std::vector<geom::Vec2u> bfs(const Walls &walls, geom::Vec2u start, geom::Vec2u finish) {
    std::vector<geom::Vec2u> q = {start};
    std::vector<unsigned> prev_index = {-1u};
    auto used = walls;
    used[start] = 1;
    constexpr geom::Vec2u deltas[] = {{-1u, 0}, {1, 0}, {0, -1u}, {0, 1}};
    for (size_t i = 0; i < q.size(); ++i) {
        auto v = q[i];
        if (v == finish) {
            std::vector<geom::Vec2u> path = {v};
            while (prev_index[i] != -1u) {
                path.emplace_back(q[prev_index[i]]);
                i = prev_index[i];
            }
            std::reverse(path.begin(), path.end());
            return path;
        }
        for (auto d : deltas){
            auto nv = v + d;
            if (nv.x < walls.width && nv.y < walls.height && !used[nv]) {
                q.emplace_back(nv);
                prev_index.emplace_back(i);
                used[nv] = 1;
            }
        }
    }

    assert(!"Could not find path!");
}
