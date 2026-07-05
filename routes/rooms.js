const express = require("express");

const authenticate = require("../middlewares/authMiddleware");

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

router.post("/",authenticate,validateRoom,createRoom);

router.get("/", getRooms);

router.get("/:id/winner", winner);

router.get("/:id", getRoomById);

router.delete("/:id",authenticate,deleteRoom);

router.put("/:id",authenticate,validateRoom,updateRoom);

router.post("/:id/ideas",authenticate,validateIdea,addIdea);

router.post("/:id/ideas/:ideaId/vote",authenticate,voteIdea);

module.exports = router;