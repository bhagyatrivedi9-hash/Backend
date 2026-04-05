import Sidebar from './Sidebar';
import { UserMessage, AIResponseMessage } from './EvaluationMessages';

// ---------------------------------------------
// Sub-Component: ChatInput
// ---------------------------------------------
function ChatInput() {
  return (
    <div className="w-full max-w-4xl mx-auto pb-6 px-4">
      <div className="relative flex items-end w-full rounded-2xl bg-white border border-neutral-200 shadow-sm transition-shadow focus-within:shadow-md focus-within:border-neutral-300">
        <textarea
          rows={1}
          placeholder="Ask a problem for the AI to battle on..."
          className="w-full max-h-48 py-4 pl-6 pr-14 bg-transparent border-0 resize-none focus:ring-0 text-neutral-800 placeholder:text-neutral-400 outline-none rounded-2xl text-[15px]"
        />
        <button className="absolute right-3 bottom-3 p-2 bg-neutral-800 text-white rounded-xl hover:bg-black transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
        </button>
      </div>
      <p className="text-center text-xs text-neutral-400 mt-3 hidden md:block">
        AI Battle Arena evaluates two solutions and judges their effectiveness.
      </p>
    </div>
  );
}

// ---------------------------------------------
// Component: Main Layout
// ---------------------------------------------
export default function ChatApp({ mockData }) {
  if (!mockData) return null;

  return (
    <div className="flex h-screen bg-white text-neutral-800 font-sans overflow-hidden">
      
      <Sidebar />

      <div className="flex-1 flex flex-col relative w-full">
        {/* Mobile Header (Hidden on Desktop) */}
        <div className="md:hidden flex items-center p-4 border-b border-neutral-200">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className="text-neutral-800 mr-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
          <h1 className="font-semibold text-neutral-800 text-sm tracking-wide uppercase">AI Battle Arena</h1>
        </div>

        {/* Scrollable Message Thread */}
        <div className="flex-1 overflow-y-auto w-full">
           <div className="max-w-4xl mx-auto pt-10 pb-32 px-4 md:px-6"> 
              <UserMessage message={mockData.problem} />
              <AIResponseMessage data={mockData} />
           </div>
        </div>

        {/* Fixed Interaction Area */}
        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-white via-white to-transparent pt-10 pb-4">
          <ChatInput />
        </div>
      </div>
    </div>
  );
}
