import React, { useState } from 'react';
import { Send, Plus, Settings, MoreVertical } from 'lucide-react';
import { useChat } from '../hooks/useChat';
import { useSelector } from 'react-redux';
import ReactMarkdown from 'react-markdown';
import { useEffect } from 'react';
import remarkGfm from 'remark-gfm'

const Dashboard = () => {
  const [chatInput, setChatInput] = useState('')
  const chats = useSelector((state) => state.chat.chats);
  const currentChatId = useSelector((state) => state.chat.currentChatId);
  const { handleSendMessage, handleGetChats, handleOpenChat } = useChat();

  useEffect(() => {
    const initializeChat = async () => {
      await handleGetChats();
    };
    initializeChat();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault()
    const trimmedMessage = chatInput.trim();
    if (trimmedMessage === '') return;
    setChatInput('');
    await handleSendMessage({ message: trimmedMessage, chatId: currentChatId })
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
          <h1 className="text-lg font-semibold text-white mb-4">Perplexity</h1>
          <button
            onClick={() => { handleSendMessage({ message: "Hello", chatId: null }) }}
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
                ${currentChatId === chat.id
                  ? 'bg-slate-700 border-l-2 border-white'
                  : 'bg-slate-800 border-l-2 border-transparent hover:bg-slate-700'
                }`}
            >
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-white truncate">{chat.title}</span>
                <span className="text-xs text-slate-500 ml-2 shrink-0">Now</span>
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

          {/* Chat messages */}
          {chats[currentChatId]?.messages.map((message, index) => (
            <div key={index} className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}>

              {/* Avatar */}
              <div className="w-8 h-8 rounded bg-slate-700 flex items-center justify-center shrink-0">
                <span className="text-xs  font-bold">{message.role === 'user' ? 'U' : 'AI'}</span>
              </div>

              {/* Message bubble */}
              <div className={`flex-1 max-w-2xl flex flex-col ${message.role === 'user' ? 'items-end' : 'items-start'}`}>
                <div className="bg-slate-900 border border-slate-800 text-slate-200 rounded-lg px-4 py-3">

                  {message.role === 'ai' ? (
                    // ✅ AI message — rendered as Markdown
                    <div className="text-sm leading-relaxed">
                      <ReactMarkdown
                        components={{
                          // inline & block code
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
                          // headings
                          h1: ({ children }) => <h1 className="text-lg font-bold text-white mt-3 mb-1">{children}</h1>,
                          h2: ({ children }) => <h2 className="text-base font-bold text-white mt-3 mb-1">{children}</h2>,
                          h3: ({ children }) => <h3 className="text-sm font-bold text-white mt-2 mb-1">{children}</h3>,
                          // paragraph
                          p: ({ children }) => <p className="text-sm text-slate-200 leading-relaxed mb-2">{children}</p>,
                          // lists
                          ul: ({ children }) => <ul className="list-disc list-inside text-sm text-slate-200 space-y-1 mb-2">{children}</ul>,
                          ol: ({ children }) => <ol className="list-decimal list-inside text-sm text-slate-200 space-y-1 mb-2">{children}</ol>,
                          li: ({ children }) => <li className="text-sm text-slate-200">{children}</li>,
                          // bold & italic
                          strong: ({ children }) => <strong className="font-bold text-white">{children}</strong>,
                          em: ({ children }) => <em className="italic text-slate-300">{children}</em>,
                          // links
                          a: ({ href, children }) => (
                            <a href={href} target="_blank" rel="noreferrer" className="text-blue-400 underline hover:text-blue-300">
                              {children}
                            </a>
                          ),
                          // horizontal rule
                          hr: () => <hr className="border-slate-700 my-3" />,
                          // blockquote
                          blockquote: ({ children }) => (
                            <blockquote className="border-l-4 border-slate-600 pl-3 italic text-slate-400 my-2">
                              {children}
                            </blockquote>
                          ),
                        }}
                         remarkPlugins={[remarkGfm]}
                      >
                        {message.content}
                      </ReactMarkdown>
                    </div>
                  ) : (
                    // ✅ User message — plain text
                    <p className="text-sm leading-relaxed">{message.content}</p>
                  )}

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