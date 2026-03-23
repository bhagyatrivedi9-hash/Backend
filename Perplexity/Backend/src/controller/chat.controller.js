import chatModel from "../model/chat.model.js";
import messageModel from "../model/message.model.js";
import {generateResponse,generateChatTitle} from "../services/ai.service.js";

export const sendMessage= async (req, res)=> {
    
    const {message}= req.body;
   
      const title= await generateChatTitle(message);
      const airesponse= await generateResponse(message);

     const chat= await chatModel.create({
        user:req.user._id,
        title
    });
     
const userMessage= await messageModel.create({
    chat:chat._id,
    role:"user",
    content:message
});
const aiMessage= await messageModel.create({
    chat:chat._id,
    role:"ai",
    content:airesponse
});
    res.status(200).json({
        success:true,
        data:{
            chat,
            userMessage,
            aiMessage
        }
    })
}
