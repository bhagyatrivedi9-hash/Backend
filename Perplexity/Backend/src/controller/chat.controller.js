import chatModel from "../model/chat.model.js";
import messageModel from "../model/message.model.js";
import {generateResponseStream,generateChatTitle} from "../services/ai.service.js";

export const sendMessage = async (req, res) => {
    try {
        const { message } = req.body;
        const chatId = req.params.chatId || null;

       
        if (!message || message.trim() === "") {
            return res.status(400).json({
                success: false,
                message: "Message cannot be empty"
            });
        }

        let chat = null;

    
        if (!chatId) {
            const title = await generateChatTitle(message);
            chat = await chatModel.create({
                user: req.user.id,
                title
            });
        } else {
            chat = await chatModel.findById(chatId);

            if (!chat) {
                return res.status(404).json({
                    success: false,
                    message: "Chat not found"
                });
            }
        }

        const resolvedChatId = chat._id;

      
        res.setHeader("Content-Type", "application/json");
        res.setHeader("Transfer-Encoding", "chunked");

        res.write(JSON.stringify({
            type: "meta",
            chat: { _id: chat._id, title: chat.title }
        }) + "\n");

        await messageModel.create({
            chat: resolvedChatId,
            role: "user",
            content: message
        });

       
        const messages = await messageModel.find({ chat: resolvedChatId });

        let fullResponse = "";
        const stream = generateResponseStream(messages);

        
        try {
            for await (const chunk of stream) {
                if (!chunk) continue; 

                fullResponse += chunk;

                res.write(JSON.stringify({
                    type: "chunk",
                    data: chunk
                }) + "\n");
            }
        } catch (err) {
            console.error("Stream error:", err);
        }

        if (!fullResponse || fullResponse.trim() === "") {
            fullResponse = "Sorry, I couldn't generate a response.";
        }

       
        await messageModel.create({
            chat: resolvedChatId,
            role: "ai",
            content: fullResponse
        });

        res.end();

    } catch (err) {
        console.error("Streaming error:", err);

        if (!res.headersSent) {
            res.status(500).json({
                success: false,
                message: "Internal server error"
            });
        } else {
            res.end();
        }
    }
};
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

import mongoose from "mongoose";

export const deleteChat = async (req, res) => {
    try {
        const { chatId } = req.params;
        const userId = req.user?.id;

        console.log("chatId:", chatId);
        console.log("userId:", userId);

        
        if (!mongoose.Types.ObjectId.isValid(chatId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid Chat ID"
            });
        }

       
        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            });
        }

        const chat = await chatModel.findOne({
            _id: chatId,
            user: userId
        });

        if (!chat) {
            return res.status(404).json({
                success: false,
                message: "Chat not found"
            });
        }

    
        await chatModel.findByIdAndDelete(chatId);
        await messageModel.deleteMany({ chat: chatId });

        res.status(200).json({
            success: true,
            message: "Chat deleted successfully"
        });

    } catch (err) {
        console.error("DeleteChat Error:", err);

        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};