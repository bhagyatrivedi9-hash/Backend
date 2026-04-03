import { setChats, addMessages, setCurrentChatId, setStreamingMessage, setError, setLoading, createNewChat, addNewMessage } from "../chat.slice";
import { streamMessage, getChats, getMessages, deleteChat } from "../services/chat.api";
import { useDispatch ,useSelector} from "react-redux";
import { initializeSocketConnection } from "../services/chat.socket";
import { useRef } from "react";

export const useChat = () => {

const dispatch = useDispatch();
const currentChatId = useSelector(state => state.chat.currentChatId);
    const chats = useSelector(state => state.chat.chats); 

async function handleSendMessage({ message, chatId }) {
    dispatch(setLoading(true));

    let fullMessage = "";
    let resolvedChatId = chatId;

    
    if (resolvedChatId) {
        dispatch(addNewMessage({ chatId: resolvedChatId, content: message, role: "user" }));
    }

    await streamMessage(resolvedChatId, message, async (chunk, meta) => {
        if (meta?.chat && !chatId) {
            resolvedChatId = meta.chat._id;
            dispatch(createNewChat({ chatId: meta.chat._id, title: meta.chat.title }));
            dispatch(setCurrentChatId(meta.chat._id));

          
            dispatch(addNewMessage({ chatId: meta.chat._id, content: message, role: "user" }));
        }

        if (chunk) {
            fullMessage += chunk;
            dispatch(setStreamingMessage({ chatId: resolvedChatId, message: fullMessage }));
        }
    });

    
    dispatch(addNewMessage({ chatId: resolvedChatId, content: fullMessage, role: "ai" }));
    dispatch(setStreamingMessage({ chatId: resolvedChatId, message: "" }));
    dispatch(setLoading(false));
}
    async function handleGetChats() {
    dispatch(setLoading(true))
    const data = await getChats()
    const { chats } = data
    dispatch(setChats(chats.reduce((acc, chat) => {
        acc[chat._id] = {
            id: chat._id,
            title: chat.title,
            messages: [],
            streamingMessage: "", 
            lastUpdated: chat.updatedAt,
        }
        return acc
    }, {})))
    dispatch(setLoading(false))
}
    async function handleOpenChat(chatId, chats) {

        console.log(chats[ chatId ]?.messages.length)

        if (chats[ chatId ]?.messages.length === 0) {
            const data = await getMessages({chatId})
            const { messages } = data

            const formattedMessages = messages.map(msg => ({
                content: msg.content,
                role: msg.role,
            }))

            dispatch(addMessages({
                chatId,
                messages: formattedMessages,
            }))
        }
        dispatch(setCurrentChatId(chatId))
    }


    async function handleDeleteChat( chatId ) {
     
        dispatch(setLoading(true))
        await deleteChat( chatId)
        await handleGetChats()
        dispatch(setCurrentChatId(null));
        dispatch(setLoading(false))
    }

    return {
        initializeSocketConnection,
        handleSendMessage,
        handleGetChats,
        handleOpenChat,
        handleDeleteChat
    }

}
