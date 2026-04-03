import React, { useState } from 'react';
import { Send, Plus, Settings, MoreVertical } from 'lucide-react';
import { useChat } from '../hooks/useChat';
import { useSelector } from 'react-redux';
import ReactMarkdown from 'react-markdown';
import { useEffect } from 'react';
import remarkGfm from 'remark-gfm'
import  {useAuth} from "../../auth/hooks/useAuth"
import { RiLogoutCircleRLine } from "react-icons/ri";
import {RiPerplexityFill} from "react-icons/ri"
import {RiDeleteBinLine} from "react-icons/ri"


const Dashboard = () => {
  const [chatInput, setChatInput] = useState('')
  const chats = useSelector((state) => state.chat.chats);
  const loading = useSelector((state) => state.chat.loading);
  const currentChatId = useSelector((state) => state.chat.currentChatId);
  const streamingMessage = useSelector(
    state => state.chat.chats[currentChatId]?.streamingMessage
);
  const { handleSendMessage, handleGetChats, handleOpenChat,handleDeleteChat } = useChat();
 const user= useSelector((state)=>state.auth.user)
const {handlelogout}=useAuth()

  useEffect(() => {
    const initializeChat = async () => {
      await handleGetChats();
    };
    initializeChat();
  }, []);

const handleSubmit = async (e) => {
  e.preventDefault();

  if (loading) return;

  const trimmedMessage = chatInput.trim();
  if (trimmedMessage === '') return;

  setChatInput('');

  await handleSendMessage({
    message: trimmedMessage,
    chatId: currentChatId
  });
};


  const logout= async()=>{
    await handlelogout();
  }
    const openChat = async (chatId) => {
    await handleOpenChat(chatId, chats);
  }

  return (
    <div className="flex h-screen w-full bg-slate-950 text-white font-sans">
      {/* Left Sidebar */}
      <div className="w-72 flex flex-col border-r border-slate-800 bg-slate-900">
        {/* Header */}
        <div className="p-4 border-b border-slate-800">
          <div className='flex gap-0.5'>

           <RiPerplexityFill className='text-white text-3xl'/>
          <h1 className="text-lg font-semibold text-white mb-4">Perplexity</h1>
          </div>
          <button
            onClick={() => { handleSendMessage({ message:"hello", chatId: null }) }}
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
            <div
              key={chat.id}
              onClick={() => openChat(chat.id)}
              className={`mx-2 mb-1 p-3 active:scale-95 rounded cursor-pointer transition-colors
                ${currentChatId === chat._id
                  ? 'bg-slate-700 border-l-2 border-white'
                  : 'bg-slate-800 border-l-2 border-transparent hover:bg-slate-700'
                }`}
            >
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-white truncate">{chat.title}</span>
            <RiDeleteBinLine 
  onClick={(e) => { 
    e.stopPropagation(); 
    
    handleDeleteChat(chat.id); 
  }} 
/>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="p-3 border-t border-slate-800">
          <button className="w-full flex items-center gap-3 px-3 py-2 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition-colors">
            <Settings className="w-4 h-4" />
            <span className="text-sm">Settings</span>
          </button>
          <div className="flex items-center gap-3 px-3 py-2 mt-2 rounded bg-slate-800/50">
            <div className="w-8 h-8 rounded bg-slate-700 flex items-center justify-center text-xs font-medium">
              {user?.username.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">{user?.username}</p>
            </div>
           <div>
    
     
      <RiLogoutCircleRLine size={24} onClick={()=>logout()} className='text-red-500  cursor-pointer' />
     
      
    </div>
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-slate-950">
        {/* Header */}
        <div className="h-14 border-b border-slate-800 flex items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            <h2 className="font-medium">{chats[currentChatId]?.title || 'General Chat'}</h2>
          </div>
         <RiPerplexityFill className='text-white text-3xl'/>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">

          {/* Default AI welcome message */}
          {!currentChatId && (
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
              </div>
            </div>
          )}
    {chats[currentChatId]?.messages.map((message, index) => (
    <div key={index} className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}>

        {/* Message bubble */}
        <div className={`flex-1 max-w-2xl flex flex-col ${message.role === 'user' ? 'items-end' : 'items-start'}`}>

            {message.role === 'ai' ? (
                <div className="text-sm leading-relaxed">
                    {/* ✅ always show content with ReactMarkdown */}
                    <ReactMarkdown
                        components={{
                            code({ className, children, ...props }) {
                                const isInline = !className;
                                return isInline ? (
                                    <code className="bg-slate-800 text-green-400 px-1 py-0.5 rounded text-xs" {...props}>
                                        {children}
                                    </code>
                                ) : (
                                    <pre className="bg-slate-800 rounded-lg p-3 overflow-x-auto my-2">
                                        <code className="text-green-400 text-xs" {...props}>
                                            {children}
                                        </code>
                                    </pre>
                                );
                            },
                            h1: ({ children }) => <h1 className="text-lg font-bold text-white mt-3 mb-1">{children}</h1>,
                            h2: ({ children }) => <h2 className="text-base font-bold text-white mt-3 mb-1">{children}</h2>,
                            p: ({ children }) => <p className="text-sm text-slate-200 leading-relaxed mb-2">{children}</p>,
                        }}
                        remarkPlugins={[remarkGfm]}
                    >
                        {message.content}
                    </ReactMarkdown>
                </div>
            ) : (
                <div className="bg-slate-900 border border-slate-800 text-slate-200 rounded-lg px-4 py-3">
                    <p className="text-sm leading-relaxed">{message.content}</p>
                </div>
            )}
        </div>
      </div>
    ))}
                  {streamingMessage && (
    <div className="flex gap-3">
        <div className="flex-1 max-w-2xl">
            <div className="text-sm leading-relaxed">
                <ReactMarkdown
                    components={{
                        code({ className, children, ...props }) {
                            const isInline = !className;
                            return isInline ? (
                                <code className="bg-slate-800 text-green-400 px-1 py-0.5 rounded text-xs" {...props}>
                                    {children}
                                </code>
                            ) : (
                                <pre className="bg-slate-800 rounded-lg p-3 overflow-x-auto my-2">
                                    <code className="text-green-400 text-xs" {...props}>
                                        {children}
                                    </code>
                                </pre>
                            );
                        },
                        h1: ({ children }) => <h1 className="text-lg font-bold text-white mt-3 mb-1">{children}</h1>,
                        h2: ({ children }) => <h2 className="text-base font-bold text-white mt-3 mb-1">{children}</h2>,
                        p: ({ children }) => <p className="text-sm text-slate-200 leading-relaxed mb-2">{children}</p>,
                    }}
                    remarkPlugins={[remarkGfm]}
                >
                    {streamingMessage}
                </ReactMarkdown>
            </div>
        </div>
    </div>
)}
       

{loading && !streamingMessage && (
    <div className="flex gap-3">
     
       <p className="text-sm text-slate-200">Loading....</p>
    </div>
)}

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
