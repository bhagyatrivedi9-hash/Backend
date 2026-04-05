export default function Sidebar() {
  return (
    <div className="w-64 flex-shrink-0 bg-neutral-50 border-r border-neutral-200 hidden md:flex flex-col h-full">
      <div className="p-4 border-b border-neutral-200">
        <h1 className="font-semibold text-neutral-800 tracking-wide text-sm uppercase">AI Battle Arena</h1>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        <h2 className="text-xs font-semibold text-neutral-400 mb-4 px-2 uppercase tracking-widest">Recent Chats</h2>
        {/* Active Mock session */}
        <div className="bg-neutral-200/50 text-neutral-800 text-sm px-3 py-2 rounded-lg cursor-pointer truncate">
          Compare Python Generators
        </div>
        {/* Inactive Mock sessions */}
        <div className="hover:bg-neutral-100 text-neutral-500 text-sm px-3 py-2 rounded-lg cursor-pointer transition-colors truncate">
          React Context vs Redux
        </div>
        <div className="hover:bg-neutral-100 text-neutral-500 text-sm px-3 py-2 rounded-lg cursor-pointer transition-colors truncate">
          Tailwind grid vs flex
        </div>
      </div>
      <div className="p-4 border-t border-neutral-200">
        <div className="flex items-center gap-3 w-full hover:bg-neutral-100 p-2 rounded-lg transition-colors cursor-pointer group">
          <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-sm">
            U
          </div>
          <div className="flex-1 text-left">
            <p className="text-sm font-medium text-neutral-800">User</p>
            <p className="text-xs text-neutral-500">Free Plan</p>
          </div>
          {/* Logout Icon that appears on hover */}
          <div className="text-neutral-400 group-hover:text-red-500 transition-colors" title="Log out">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
