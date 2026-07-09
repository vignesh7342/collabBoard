const presenceManager = require("../utils/presenceManager");
const typingManager = require("../utils/typingManager");

module.exports = function registerDisconnectEvents(io, socket) {

    socket.on("disconnect", () => {

        if (socket.currentRoom) {

            presenceManager.leaveRoom(
                socket.currentRoom,
                socket.user.id
            );

            typingManager.stopTyping(
                socket.currentRoom,
                socket.user.id
            );

            io.to(socket.currentRoom).emit(
                "presenceUpdated",
                presenceManager.getUsers(socket.currentRoom)
            );

            io.to(socket.currentRoom).emit(
                "typingUpdated",
                typingManager.getTypingUsers(socket.currentRoom)
            );

        }

        console.log(`${socket.user.name} disconnected`);

    });

};