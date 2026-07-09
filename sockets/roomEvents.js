const roomService = require("../services/roomService");
const presenceManager = require("../utils/presenceManager");
const typingManager = require("../utils/typingManager");

module.exports = function registerRoomEvents(io, socket) {

    socket.on("joinRoom", async (roomId) => {

        const room = await roomService.getRoomById(roomId);

        if (!room) {
            return;
        }

        if (socket.currentRoom) {

            presenceManager.leaveRoom(
                socket.currentRoom,
                socket.user.id
            );

            typingManager.stopTyping(
                socket.currentRoom,
                socket.user.id
            );

            socket.leave(socket.currentRoom);

            io.to(socket.currentRoom).emit(
                "presenceUpdated",
                presenceManager.getUsers(socket.currentRoom)
            );

            io.to(socket.currentRoom).emit(
                "typingUpdated",
                typingManager.getTypingUsers(socket.currentRoom)
            );

        }

        socket.join(roomId);

        presenceManager.joinRoom(roomId, {
            id: socket.user.id,
            name: socket.user.name
        });

        io.to(roomId).emit(
            "presenceUpdated",
            presenceManager.getUsers(roomId)
        );

        socket.currentRoom = roomId;

        console.log(`${socket.user.name} joined room ${roomId}`);

    });

};