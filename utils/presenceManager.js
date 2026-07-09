const rooms = new Map();

function joinRoom(roomId, user) {

    if (!rooms.has(roomId)) {
        rooms.set(roomId, []);
    }

    const users = rooms.get(roomId);
    const exists = users.some(
        u => u.id === user.id
    );

    if (!exists) {
        users.push(user);
    }
}

function leaveRoom(roomId, userId) {

    if (!rooms.has(roomId)) return;

    const users = rooms.get(roomId).filter(
        user => user.id !== userId
    );

    if (users.length === 0) {
        rooms.delete(roomId);
    } else {
        rooms.set(roomId, users);
    }
}

function getUsers(roomId) {

    return rooms.get(roomId) || [];
}

module.exports = {
    joinRoom,
    leaveRoom,
    getUsers
};