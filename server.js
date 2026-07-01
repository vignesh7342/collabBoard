const express=require("express");

const app=express();

app.use(express.json());

const logger = require("./utils/logger");

const roomRoutes=require("./routes/rooms");

const errorHandler=require("./middlewares/errorHandler");

app.get("/", (req, res) =>{
    res.send("Welcome to CollabBoard");
});

app.use("/rooms", roomRoutes);

app.listen(3000, () => {
    logger.info(`Server started on port 3000`);
});

app.use(errorHandler);