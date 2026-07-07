const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const roomRoutes = require("./routes/rooms");
const userRoutes = require("./routes/users");

const errorHandler = require("./middlewares/errorHandler");

const app = express();

const server = http.createServer(app);

const io = new Server(server);

app.use(express.json());

app.use("/rooms", roomRoutes);
app.use("/users", userRoutes);

io.on("connection", (socket) => {
    console.log("A user connected");

    socket.on("disconnect", () => {
        console.log("User disconnected");
    });
});

app.use(errorHandler);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});