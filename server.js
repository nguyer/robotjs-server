#!node

const WebSocket = require("ws");
const robot = require("robotjs");

let PORT = 8080;

if (process.env.PORT) {
  PORT = Number(process.env.PORT);
}

if (process.argv.length >= 3) {
  PORT = Number(process.argv[2]);
}

const wss = new WebSocket.Server({ port: PORT });

wss.on("connection", function connection(ws) {
  console.log("connected");
  ws.on("message", function incoming(data) {
    try {
      let json = JSON.parse(data.toString());
      console.log(json);
      if (json.function) {
        robot[json.function].apply(null, json.arguments);
      }
    } catch (e) {
      console.log(data);
    }
  });
});

console.log(`robotjs-server running on port ${PORT}`);
