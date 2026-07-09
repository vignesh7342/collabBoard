const { get } = require("../routes/rooms");
const roomService = require("../services/roomService");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");
const { getIO } = require("../utils/socketManager");

const createRoom = catchAsync(async (req, res) => {
    const room = await roomService.createRoom(
        req.body.name,
        req.user.id
    );
    res.status(201).json(room);
});

const getRooms = catchAsync(async (req, res) => {
    const rooms = await roomService.getAllRooms();
    res.json(rooms);
});

const getRoomById = catchAsync(async (req, res) => {
    const room = await roomService.getRoomById(
        Number(req.params.id)
    );
    if (!room) {
        throw new AppError("Room not found", 404);
    }
    res.json(room);
});

const updateRoom = catchAsync(async (req, res) => {
    const room = await roomService.updateRoom(
        Number(req.params.id),
        req.body.name,
        req.user.id
    );
    if(!room){
        throw new AppError("Room not found", 404);
    }
    res.json(room);
});

const deleteRoom = catchAsync(async (req,res) => {
    const deleted = await roomService.deleteRoom(Number(req.params.id), req.user.id);
    if(!deleted){
        throw new AppError("Room not found", 404);
    }
    res.json({
        message:"Room deleted successfully"
    });
});

const voteIdea = catchAsync(async (req, res) => {

    const updatedIdea = await roomService.voteIdea(
        req.params.id,
        req.params.ideaId
    );

    if (!updatedIdea) {
        throw new AppError("Room or Idea not found", 404);
    }

    const io = getIO();

    io.to(req.params.id).emit(
        "voteUpdated",
        updatedIdea
    );

    res.json(updatedIdea);

});


const winner = catchAsync(async (req, res) => {
    const idea = await roomService.getWinner(
        Number(req.params.id)
    );
    if (!idea) {
        throw new AppError("No winner found", 404);
    }
    res.json(idea);
});

const addIdea = catchAsync(async (req, res) => {
    const idea = await roomService.addIdea(
        Number(req.params.id),
        req.body.text
    );
    if (!idea) {
        throw new AppError("Room not found", 404);
    }
    const io=getIO();
    io.to(req.params.id).emit("ideaCreated", idea);
    res.status(201).json(idea);
});

module.exports = {
    createRoom,
    getRooms,
    getRoomById,
    updateRoom,
    deleteRoom,
    addIdea,   
    voteIdea,  
    winner     
};