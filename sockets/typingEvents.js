const typingManager = require("../utils/typingManager");

module.exports = function registerTypingEvents(io, socket) {

    socket.on("typing", () => {

        if (!socket.currentRoom) {
            return;
        }

        typingManager.startTyping(
            socket.currentRoom,
            {
                id: socket.user.id,
                name: socket.user.name
            }
        );

        socket.to(socket.currentRoom).emit(
            "typingUpdated",
            typingManager.getTypingUsers(socket.currentRoom)
        );

    });

    socket.on("stopTyping", () => {

        if (!socket.currentRoom) {
            return;
        }

        typingManager.stopTyping(
            socket.currentRoom,
            socket.user.id
        );

        socket.to(socket.currentRoom).emit(
            "typingUpdated",
            typingManager.getTypingUsers(socket.currentRoom)
        );

    });

};