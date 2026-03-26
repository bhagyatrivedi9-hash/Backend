import { setChats,addMessages, setCurrentChatId, setError, setLoading, createNewChat, addNewMessage } from "../chat.slice";
import {sendMessage,getChats,getMessages,deleteChat}from"../services/chat.api";
import {useDispatch} from "react-redux";
import {initializeSocketConnection } from "../services/chat.socket";
import { use } from "react";

export const useChat = () => {
  const dispatch = useDispatch()
 const handleSendMessage = async ({ chatId, message }) => {
    dispatch(setLoading(true));
    const data = await sendMessage({ chatId, message });
    const { chat, aiMessage, userMessage } = data.data;

    const resolvedChatId = chat?._id || chatId; 

    if (chat) {
        dispatch(createNewChat({
            chatId: chat._id,
            title: chat.title
        }));
    }

    dispatch(addNewMessage({
        chatId: resolvedChatId,
        content: userMessage.content,
        role: "user"
    }));

    dispatch(addNewMessage({
        chatId: resolvedChatId,
        content: aiMessage.content,
        role: "ai"
    }));

    dispatch(setCurrentChatId(resolvedChatId));
    dispatch(setLoading(false));
}
    const handleGetChats= async()=>{
        dispatch(setLoading(true));
        const data= await getChats();
        dispatch(setChats(data.chats));
        dispatch(setLoading(false));
    }
    const handleGetMessages= async({chatId})=>{
        dispatch(setLoading(true));
        const data= await getMessages({chatId});
       
         dispatch(setCurrentChatId(chatId));
        dispatch(addMessages({chatId, messages: data.messages}));
        dispatch(setLoading(false));
        return data;
    }
    const handleDeleteChat= async({chatId})=>{
        dispatch(setLoading(true));
        await deleteChat({chatId});
        dispatch(setLoading(false));
        handleGetChats();
    }
    return {initializeSocketConnection,handleSendMessage,handleGetChats,handleGetMessages,handleDeleteChat};

}


   
