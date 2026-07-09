const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const socketHandler = require("./sockets/socketHandler");
const roomRoutes = require("./routes/rooms");
const userRoutes = require("./routes/users");
const socketAuth = require("./middlewares/socketAuth");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

const server = http.createServer(app);

const { setIO } = require("./utils/socketManager");

const io = new Server(server);

setIO(io);

io.use(socketAuth);

socketHandler(io);

app.use(express.json());

app.use("/rooms", roomRoutes);
app.use("/users", userRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});