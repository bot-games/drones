#pragma once

#include "geom/line.hpp"
#include "geom/vector.hpp"

namespace geom {

template <class T1, class T2>
[[gnu::always_inline, nodiscard, gnu::pure]] inline auto distSq(const Vec2<T1> &a,
                                                                const Vec2<T2> &b) noexcept {
    return (a - b).lenSq();
}

template <class T1, class T2>
[[gnu::always_inline, nodiscard, gnu::pure]] inline auto dist(const T1 &a, const T2 &b) {
    return std::sqrt(distSq(a, b));
}

}  // namespace geom
