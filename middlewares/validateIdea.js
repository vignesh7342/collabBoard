const AppError = require("../utils/AppError");
const validateIdea = (req,res,next)=>{
    const { text } = req.body;
    if(!text){
        throw new AppError(
            "Idea text required",
            400
        );
    }
    if(typeof text !== "string"){
        throw new AppError(
            "Idea must be string",
            400
        );
    }
    if(text.trim()===""){
        throw new AppError(
            "Idea cannot be empty",
            400
        );
    }
    next();
}

module.exports=validateIdea;