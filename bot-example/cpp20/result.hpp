#pragma once

#include <variant>
#include <optional>
#include <utility>
#include <iostream>

template<class T, class Error>
struct Result {
    std::variant<T, Error> res;

    bool isError() const {
        return res.index() == 1;
    }

    T get() && {
        if (res.index() == 0) {
            return std::move(std::get<T>(res));
        } else {
            std::cerr << std::get<Error>(res) << std::endl;
            abort();
        }
    }

    Error getError() && {
        return std::move(std::get<Error>(res));
    }
};

template<class Error>
struct Result<void, Error> {
    std::optional<Error> err;

    bool isError() const {
        return (bool) err;
    }

    void get() && {
        if (err) {
            std::cerr << *err << std::endl;
            abort();
        }
    }

    Error getError() && {
        return std::move(*err);
    }
};
