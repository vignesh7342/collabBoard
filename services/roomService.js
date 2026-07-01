const pool = require("../database/db");

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

const createRoom = async (name) => {
    const result = await pool.query(
        'INSERT INTO rooms(name) VALUES($1) RETURNING *',
        [name.trim()]
    );
    return result.rows[0];
};

const updateRoom = async (id, name) => {
    const result = await pool.query(
        'UPDATE rooms SET name = $1 WHERE id = $2 RETURNING *',
        [name.trim(), id]
    );
    return result.rows[0];
};

const deleteRoom = async(id) => {
    const result = await pool.query(
        'DELETE FROM rooms WHERE id=$1',
        [id]
    );
    return result.rowCount>0;
};

// Idea management
const addIdea = async (roomId, text) => {
    const room = getRoomById(roomId);
    if(!room)
        return null;

    const result = await pool.query(
        'INSERT INTO ideas(text, room_id) VALUES($1, $2) RETURNING *',
        [text.trim(), roomId]
    );

    return result.rows[0];
}

const voteIdea = async (roomId, ideaId) => {
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