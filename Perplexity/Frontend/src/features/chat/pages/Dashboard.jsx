import React, { useState } from 'react';
import { Send, Plus, Settings, MoreVertical } from 'lucide-react';
import { useChat } from '../hooks/useChat';
import { useSelector } from 'react-redux';

import { useEffect } from 'react';
const Dashboard = () => {
  const [chatInput, setChatInput] = useState('')
  const [userMessage, setUserMessage] = useState('')
const chats= useSelector((state)=> state.chat.chats);
const currentChatId= useSelector((state)=> state.chat.currentChatId);
const { initializeSocketConnection, handleGetChats ,handleSendMessage,handleGetMessages,handleDeleteChat} = useChat();
  useEffect(() => {
    const initializeChat = async () => {
      initializeSocketConnection();
      await handleGetChats();
    };

    initializeChat();
  }, []);

  const handleSubmit = async(e) => {
    e.preventDefault()
    const trimmedMessage = chatInput.trim();
    if (trimmedMessage === '') return; // Don't send empty messages
    setUserMessage(trimmedMessage);
    setChatInput('');
    await handleSendMessage({message:trimmedMessage,chatId:currentChatId})
  }
const openChat = async (chatId) => {
    await handleGetMessages({ chatId });
}
  return (
    <div className="flex h-screen w-full bg-slate-950 text-white font-sans">
      {/* Left Sidebar */}
      <div className="w-72 flex flex-col border-r border-slate-800 bg-slate-900">
        {/* Header */}
        <div className="p-4 border-b border-slate-800">
          <h1 className="text-lg font-semibold text-white mb-4">Perplexity</h1>
          <button 
          onClick={()=>{handleSendMessage({message:"Hello",chatId:currentChatId})}}
          className="w-full flex items-center gap-2 px-3 py-2 rounded bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors">
            <Plus className="w-4 h-4" />
            <span className="text-sm">New Chat</span>
          </button>
        </div>
{/* Chat List */}
<div className="flex-1 overflow-y-auto py-2">
    <div className="px-4 py-2 text-xs font-medium text-slate-500 uppercase">
        Recent
    </div>

    {Object.values(chats).map((chat) => (
        <div key={chat._id} 
        type="button"
        onClick={() => openChat(chat._id)}
        className="mx-2 p-3 active:scale-95 rounded bg-slate-800 border-l-2 border-white cursor-pointer">
            <div className="flex justify-between items-center mb-1 cursor-pointer">
                <span className="text-sm font-medium text-white">{chat.title}</span>
                <span className="text-xs text-slate-500">Now</span>
            </div>
        </div>
    ))}

    <div className="mx-2 p-3 rounded hover:bg-slate-800/50 cursor-pointer">
        <div className="flex justify-between items-center mb-1">
            <span className="text-sm font-medium text-slate-300">Code Review</span>
            <span className="text-xs text-slate-500">2h ago</span>
        </div>
        <p className="text-xs text-slate-500 truncate">Can you help me optimize...</p>
    </div>

</div>  {/* ← closes Chat List */}

        {/* Bottom */}
        <div className="p-3 border-t border-slate-800">
          <button className="w-full flex items-center gap-3 px-3 py-2 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition-colors">
            <Settings className="w-4 h-4" />
            <span className="text-sm">Settings</span>
          </button>
          <div className="flex items-center gap-3 px-3 py-2 mt-2 rounded bg-slate-800/50">
            <div className="w-8 h-8 rounded bg-slate-700 flex items-center justify-center text-xs font-medium">
              JD
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">John Doe</p>
            </div>
            <MoreVertical className="w-4 h-4 text-slate-500" />
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-slate-950">
        {/* Header */}
        <div className="h-14 border-b border-slate-800 flex items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            <h2 className="font-medium">General Chat</h2>
          </div>
          <span className="text-xs bg-slate-800 px-2 py-1 rounded text-slate-400">GPT-4</span>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {/* AI Message */}
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded bg-slate-800 flex items-center justify-center shrink-0">
              <span className="text-xs font-bold">AI</span>
            </div>
            <div className="flex-1 max-w-2xl">
              <div className="bg-slate-900 border border-slate-800 rounded-lg px-4 py-3">
                <p className="text-sm text-slate-200 leading-relaxed">
                  Hello! I'm your AI assistant. How can I help you today?
                </p>
              </div>
              <span className="text-xs text-slate-600 mt-1 block">21:09</span>
            </div>
          </div>

          {/* User Message */}
          {Object.values(chats[currentChatId]?.messages || []).map((message, index) => (
  <div key={index} className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}>
    <div className="w-8 h-8 rounded bg-slate-700 flex items-center justify-center shrink-0">
      <span className="text-xs font-bold">{message.role === 'user' ? 'U' : 'AI'}</span>
    </div>
    <div className="flex-1 max-w-2xl flex flex-col items-end">
      <div className="bg-slate-900 border border-slate-800 text-slate-200 rounded-lg px-4 py-3">
        <p className="text-sm leading-relaxed">{message.content}</p>
      </div>
    </div>
  </div>
))}

        
        </div>

        {/* Input */}
        <div className="p-4 border-t border-slate-800">
          <form onSubmit={handleSubmit} className="max-w-3xl mx-auto flex gap-2">
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 bg-slate-900 border border-slate-800 rounded px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-slate-600"
            />
            <button 
              type="submit"
              className="px-4 py-2.5 bg-slate-900 border border-slate-800 text-white rounded cursor-pointer hover:bg-slate-800 transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
          <p className="text-center text-xs text-slate-600 mt-2">
            Press Enter to send
          </p>
        </div>
      </div>
    </div>
  );
};


export default Dashboard;