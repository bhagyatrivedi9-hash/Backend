import { createSlice } from "@reduxjs/toolkit";
import { streamMessage } from "./services/chat.api";

const chatSlice = createSlice({
    name: "chat",
    initialState: {
        chats: {},
        currentChatId: null,
        isLoading: false,
        error: null,
    },

        reducers: {
            createNewChat: (state, action) => {
                const { chatId, title } = action.payload
                state.chats[chatId] = {
                    id: chatId,
                    title,
                    messages: [],
                    streamingMessage: "",
                    lastUpdated: new Date().toISOString(),
                }
            },
            addMessages: (state, action) => {
                const { chatId, messages } = action.payload;
                if (!state.chats[chatId]) {
                    state.chats[chatId] = { messages: [] ,
                        streamingMessage: "",
                    };
                }
                state.chats[chatId].messages.push(...messages);
            },
            addNewMessage: (state, action) => {
                const { chatId, content, role } = action.payload
                if (!state.chats[chatId]) {
            state.chats[chatId] = {
                messages: [],
                streamingMessage: "",
            };
        }
                state.chats[chatId].messages.push({ content, role })
            },
            setChats(state, action) {
                state.chats = action.payload;

            },
            setStreamingMessage(state, action) {
                const { chatId, message } = action.payload;
                if (!state.chats[chatId]) {
            state.chats[chatId] = {
                messages: [],
                streamingMessage: "",
            };
        }
                state.chats[chatId].streamingMessage = message;
            },
        
        setCurrentChatId(state, action) {
            state.currentChatId = action.payload;
        },
        setLoading(state, action) {
            state.isLoading = action.payload;
        },
        setError(state, action) {
            state.error = action.payload;
        },
    },
});

export const {setStreamingMessage, createNewChat, addMessages, addNewMessage, setChats, setCurrentChatId, setLoading, setError } = chatSlice.actions;
export default chatSlice.reducer;
