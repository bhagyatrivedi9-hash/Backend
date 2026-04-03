import axios from 'axios';

const api = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true,
});

export const streamMessage = async (chatId, message, onChunk) => {
    const url = chatId
        ? `http://localhost:3000/api/chats/messages/${chatId}`
        : `http://localhost:3000/api/chats/messages`;

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        credentials: "include",
        body: JSON.stringify({ message }) 
    });

    if (!response.ok) {
        const errorText = await response.text();
        console.error("Error response:", errorText);
        throw new Error(`Request failed: ${response.status}`);
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";
    let meta = null;

    while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value);
        const lines = buffer.split("\n");
        buffer = lines.pop(); 

        for (const line of lines) {
            if (!line.trim()) continue;
            try {
                const parsed = JSON.parse(line);
                if (parsed.type === "meta") {
                    meta = parsed;
                    onChunk("", meta); 
                } else if (parsed.type === "chunk") {
                    onChunk(parsed.data, meta); 
                }
            } catch (e) {
                console.error("Failed to parse line:", line);
            }
        }
    }
};

export const getChats = async () => {
    const response = await api.get(`/api/chats/`);
    return response.data;
};

export const getMessages = async ({chatId}) => {
    const response = await api.get(`/api/chats/messages/${chatId}`);
    return response.data
};

export const deleteChat = async (chatId) => {
    const response = await api.delete(`/api/chats/delete/${chatId}`);
    return response.data;
}
