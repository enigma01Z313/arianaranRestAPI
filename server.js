const http = require("http");
const socketio = require("socket.io");
const cors = require("cors");
const app = require("./app/app");
const socketHandles = require("./socketHandles");

const port = process.env.PORT ?? 30000;

//setup cors
const corsOptions = {
  origin: "*",
  methods: "GET, PUT, PATCH, DELETE",
};
app.use(cors(corsOptions));

const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// const host = "http://67.43.234.92/"
const host = "http://localhost";
server.listen(port, () => {
  console.log(`Api server is running on: ${host}:${port}`);

  socketHandles(io);
});
