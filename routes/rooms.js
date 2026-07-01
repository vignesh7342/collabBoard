const express = require("express");

const validateRoom = require(
    "../middlewares/validateRoom"
);

const router = express.Router();

const {
    createRoom,
    getRooms,
    getRoomById,
    deleteRoom,
    updateRoom,
    addIdea,
    voteIdea,
    winner
} = require("../controllers/roomController");


const validateIdea = require("../middlewares/validateIdea");

router.post("/",validateRoom,createRoom);

router.get("/", getRooms);

router.get("/:id/winner", winner);

router.get("/:id", getRoomById);

router.delete("/:id", deleteRoom);

router.put("/:id",validateRoom,updateRoom);

router.post("/:id/ideas",validateIdea,addIdea);

router.post("/:id/ideas/:ideaId/vote", voteIdea);

module.exports = router;