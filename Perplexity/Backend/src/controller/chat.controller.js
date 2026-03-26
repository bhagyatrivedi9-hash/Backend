import chatModel from "../model/chat.model.js";
import messageModel from "../model/message.model.js";
import {generateResponse,generateChatTitle} from "../services/ai.service.js";

export const sendMessage= async (req, res)=> {
    
  const { message, chatId } = req.body;
   
     
  
       let title=null,chat=null
      if(!chatId){
          title= await generateChatTitle(message);
          chat= await chatModel.create({
             user:req.user.id,
             title
         });
      }
const resolvedChatId = chat?._id || chatId; // ← add this

const userMessage = await messageModel.create({
    chat: resolvedChatId,
    role: "user",
    content: message
});

const messages = await messageModel.find({ chat: resolvedChatId }); // ← use resolvedChatId
const result = await generateResponse(messages);

const aiMessage = await messageModel.create({
    chat: resolvedChatId,
    role: "ai",
    content: result
});
res.status(200).json({
        success:true,
        data:{
            chat,
            userMessage,
            aiMessage,
            messages
        }
    })
}


export const getChats= async (req,res)=>{
    const user=req.user;
    const chats= await chatModel.find({user:user.id});

    res.status(200).json({
        message:"Chats fetched successfully",
        chats
    })
}


export const getMessages= async (req,res)=>{
    const { chatId } = req.params;
    const userid=req.user.id;
    const chat= await chatModel.findOne({_id:chatId,user:userid});
    if(!chat){
        return res.status(404).json({
            success:false,
            message:"Chat not found"
        })
    }
    const messages= await messageModel.find({chat:chatId});
    res.status(200).json({
        success:true,
        messages
    })
}

export const deleteChat= async (req,res)=>{
        const {chatId}= req.params;
        const userid=req.user.id;
        const chat= await chatModel.findOne({_id:chatId,user:userid});
        if(!chat){
            return res.status(404).json({
                success:false,
                message:"Chat not found"
            })
        }
        await chatModel.findByIdAndDelete({_id:chatId});
        await messageModel.deleteMany({chat:chatId});

   
        res.status(200).json({
            success:true,
            message:"Chat deleted successfully"
        })
}   