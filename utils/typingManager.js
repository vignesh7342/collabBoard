const typingRooms = new Map();

function startTyping(roomId, user) {

    if (!typingRooms.has(roomId)) {
        typingRooms.set(roomId, []);
    }

    const users = typingRooms.get(roomId);

    const exists = users.some(
        u => u.id === user.id
    );

    if (!exists) {
        users.push(user);
    }

}

function stopTyping(roomId, userId) {

    if (!typingRooms.has(roomId)) {
        return;
    }

    const users = typingRooms
        .get(roomId)
        .filter(user => user.id !== userId);

    if (users.length === 0) {
        typingRooms.delete(roomId);
    } else {
        typingRooms.set(roomId, users);
    }

}

function getTypingUsers(roomId) {

    return typingRooms.get(roomId) || [];

}

module.exports = {
    startTyping,
    stopTyping,
    getTypingUsers
};