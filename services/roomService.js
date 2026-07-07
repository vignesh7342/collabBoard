const pool = require("../database/db");

const checkRoomOwnership = async (roomId, userId) => {
    const roomResult = await pool.query(
        "SELECT * FROM rooms WHERE id = $1",
        [roomId]
    );
    if (roomResult.rowCount === 0) {
        throw new AppError("Room not found", 404);
    }
    const room = roomResult.rows[0];
    if (room.user_id !== userId) {
        throw new AppError(
            "You are not authorized to perform this action",
            403
        );
    }
    return room;
};

// CRUD operations
const getAllRooms = async () => {
    const result = await pool.query(
        "SELECT * FROM rooms"
    );
    return result.rows;
};

const getRoomById = async (id) => {
    const result = await pool.query(
        "SELECT * FROM rooms WHERE id = $1",
        [id]
    );
    return result.rows[0];
};

const createRoom = async (name, userId) => {
    const result = await pool.query(
        'INSERT INTO rooms(name, user_id) VALUES($1, $2) RETURNING *',
        [name.trim(), userId]
    );
    return result.rows[0];
};

const updateRoom = async (id, name, userId) => {
    await checkRoomOwnership(id, userId);

    const result = await pool.query(
        `UPDATE rooms
         SET name = $1
         WHERE id = $2
         RETURNING *`,
        [name.trim(), id]
    );

    return result.rows[0];
};

const deleteRoom = async (id, userId) => {
    await checkRoomOwnership(id, userId);

    const result = await pool.query(
        "DELETE FROM rooms WHERE id = $1",
        [id]
    );

    return result.rowCount > 0;
};

// Idea management
const addIdea = async (roomId, text) => {
    const room = await getRoomById(roomId);
    if(!room)
        return null;

    const result = await pool.query(
        'INSERT INTO ideas(text, room_id) VALUES($1, $2) RETURNING *',
        [text.trim(), roomId]
    );

    return result.rows[0];
}

const voteIdea = async (roomId, ideaId) => {
    // Check if room exists
    const room = await getRoomById(roomId);
    if (!room) return null;
    
    const result = await pool.query(
        `UPDATE ideas SET votes = votes + 1 WHERE id = $1 AND room_id = $2
         RETURNING *`,
        [ideaId, roomId]
    );
    return result.rows[0];
};

const getWinner = async (roomId) => {
    const result = await pool.query(
        `SELECT *
         FROM ideas
         WHERE room_id = $1
         ORDER BY votes DESC
         LIMIT 1`,
        [roomId]
    );
    return result.rows[0];
};

module.exports = {
    getAllRooms,
    getRoomById,
    createRoom,
    updateRoom,
    deleteRoom,
    addIdea,
    voteIdea,
    getWinner
};