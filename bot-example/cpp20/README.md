## Description

This is an example of a bot for the Drones game on the bot-games.fun platform.

The bot searches for the shortest path to the next checkpoint (using BFS) and moves towards it with maximum acceleration.

## Compile

You need following libs:

1. https://github.com/yhirose/cpp-httplib
2. https://github.com/eropsergeev/JsonStructs
3. https://github.com/nlohmann/json
4. Base64 from gist https://gist.github.com/tomykaira/f0fd86b6c73063283afe550bc5d77594 with following patch:

```diff
@@ -32,7 +32,7 @@
 class Base64 {
  public:
 
-  static std::string Encode(const std::string data) {
+  static std::string Encode(const std::string &data) {
     static constexpr char sEncodingTable[] = {
       'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H',
       'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P',
@@ -72,7 +72,7 @@
     return ret;
   }
 
-  static std::string Decode(const std::string& input, std::string& out) {
+  static std::string Decode(const std::string& input) {
     static constexpr unsigned char kDecodingTable[] = {
       64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64,
       64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64,
@@ -99,7 +99,7 @@
     if (input[in_len - 1] == '=') out_len--;
     if (input[in_len - 2] == '=') out_len--;
 
-    out.resize(out_len);
+    std::string out(out_len, '\0');
 
     for (size_t i = 0, j = 0; i < in_len;) {
       uint32_t a = input[i] == '=' ? 0 & i++ : kDecodingTable[static_cast<int>(input[i++])];
@@ -114,7 +114,7 @@
       if (j < out_len) out[j++] = (triple >> 0 * 8) & 0xFF;
     }
 
-    return "";
+    return out;
   }
 
 };
```

All libs are signle-header, so you can just copy them to arbitrary path.

Then you can use GNU make with provided Makefile

## Usage

```bash
main <TOKEN> <HOST> <PREFIX> [IS_DEBUG] [GAMES]
```

Where

TOKEN is your token from https://bot-games.fun/profile for games on this platform or any integer for loacal games

HOST is https://api.bot-games.fun for games on site or address of your localrunner

PREFIX common prefix for all API requests (`/game/drones` for games on site or `/game` for localrunner)

IS_DEBUG is non-zero for debug games or 0 for regular ones. Default is 0

GAMES is number of games. `<=0` means `INT_MAX`. Default is 1
