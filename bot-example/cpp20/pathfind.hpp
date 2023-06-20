#pragma once

#include "model.hpp"
#include "geom/vector.hpp"

#include <vector>

std::vector<geom::Vec2u> bfs(const Walls &walls, geom::Vec2u start, geom::Vec2u finish);
