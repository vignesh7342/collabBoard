const registerRoomEvents = require("./roomEvents");
const registerTypingEvents = require("./typingEvents");
const registerDisconnectEvents = require("./disconnectEvents");

module.exports = (io) => {

    io.on("connection", (socket) => {

        console.log(`${socket.user.name} connected`);

        registerRoomEvents(io, socket);
        registerTypingEvents(io, socket);
        registerDisconnectEvents(io, socket);

    });

};