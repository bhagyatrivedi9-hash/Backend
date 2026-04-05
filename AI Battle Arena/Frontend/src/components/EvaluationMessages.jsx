import ReactMarkdown from 'react-markdown';

// ---------------------------------------------
// Component: UserMessage
// ---------------------------------------------
export function UserMessage({ message }) {
  return (
    <div className="flex justify-end w-full pb-8">
      <div className="max-w-[80%] bg-neutral-100 border border-neutral-200 text-neutral-800 rounded-3xl rounded-tr-sm px-6 py-4 shadow-sm">
        <p className="text-[15px] leading-relaxed whitespace-pre-wrap">{message}</p>
      </div>
    </div>
  );
}

// ---------------------------------------------
// Sub-Component: SolutionPanel 
// ---------------------------------------------
function SolutionPanel({ title, content }) {
  return (
    <div className="flex flex-col bg-white rounded-2xl p-6 border border-neutral-200">
      <div className="mb-4 flex items-center">
        <h3 className="font-semibold text-[15px] text-neutral-800 tracking-wide uppercase">{title}</h3>
      </div>
      <div className="prose prose-sm prose-neutral max-w-none flex-1 overflow-x-auto text-neutral-600 bg-neutral-50/50 p-4 rounded-xl border border-neutral-100">
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </div>
  );
}

// ---------------------------------------------
// Sub-Component: JudgeEvaluation
// ---------------------------------------------
function JudgeEvaluation({ judgeData }) {
  const { solution_1_score, solution_2_score, solution_1_reasoning, solution_2_reasoning } = judgeData;
  const score1 = parseFloat(solution_1_score);
  const score2 = parseFloat(solution_2_score);
  
  const isSol1Winner = score1 > score2;
  const isSol2Winner = score2 > score1;

  return (
    <div className="mt-6 bg-neutral-50 rounded-2xl p-6 border border-neutral-200">
      <div className="mb-6 flex items-center border-b border-neutral-200 pb-3">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" className="mr-2 text-neutral-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2l3 9h9l-7 5 3 9-8-5-8 5 3-9-7-5h9z" />
        </svg>
        <h3 className="text-sm font-bold tracking-widest text-neutral-800 uppercase">Judge's Verdict</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
        <div className="hidden md:block absolute left-1/2 top-4 bottom-4 w-px bg-neutral-200 transform -translate-x-1/2"></div>
        
        {/* Solution 1 Evaluation */}
        <div className={`${isSol1Winner ? 'opacity-100' : 'opacity-70'}`}>
           <div className="flex items-center gap-4 mb-4">
            <div className={`flex items-center justify-center w-12 h-12 rounded-full border border-neutral-200 ${isSol1Winner ? 'bg-neutral-900 text-white' : 'bg-white text-neutral-600'}`}>
              <span className="text-lg font-medium">{solution_1_score}</span>
            </div>
            <div>
              <span className="text-xs text-neutral-500 uppercase tracking-widest font-semibold block">Score 1</span>
              {isSol1Winner && <span className="text-[10px] font-bold text-emerald-600 tracking-wider uppercase bg-emerald-100 px-2 py-0.5 rounded-sm">Winner</span>}
            </div>
          </div>
          <div className="prose prose-sm prose-neutral max-w-none text-neutral-600">
            <ReactMarkdown>{solution_1_reasoning}</ReactMarkdown>
          </div>
        </div>

        {/* Solution 2 Evaluation */}
        <div className={`${isSol2Winner ? 'opacity-100' : 'opacity-70'}`}>
          <div className="flex items-center gap-4 mb-4">
             <div className={`flex items-center justify-center w-12 h-12 rounded-full border border-neutral-200 ${isSol2Winner ? 'bg-neutral-900 text-white' : 'bg-white text-neutral-600'}`}>
              <span className="text-lg font-medium">{solution_2_score}</span>
            </div>
            <div>
              <span className="text-xs text-neutral-500 uppercase tracking-widest font-semibold block">Score 2</span>
              {isSol2Winner && <span className="text-[10px] font-bold text-emerald-600 tracking-wider uppercase bg-emerald-100 px-2 py-0.5 rounded-sm">Winner</span>}
            </div>
          </div>
          <div className="prose prose-sm prose-neutral max-w-none text-neutral-600">
            <ReactMarkdown>{solution_2_reasoning}</ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------
// Component: AIResponseMessage
// ---------------------------------------------
export function AIResponseMessage({ data }) {
  return (
    <div className="flex w-full pb-8">
      {/* AI Avatar Mock */}
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-neutral-900 text-white flex items-center justify-center mr-4 mt-1">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="11" width="18" height="10" rx="2"></rect>
          <circle cx="12" cy="5" r="2"></circle>
          <path d="M12 7v4"></path>
          <line x1="8" y1="16" x2="8" y2="16"></line>
          <line x1="16" y1="16" x2="16" y2="16"></line>
        </svg>
      </div>

      <div className="flex-1 max-w-5xl">
        <div className="text-sm font-medium text-neutral-800 mb-3">AI Judge</div>
        
        {/* Solution Comparions side-by-side inside the message */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <SolutionPanel title="Solution 1 Output" content={data.solution_1} />
          <SolutionPanel title="Solution 2 Output" content={data.solution_2} />
        </div>

        {/* Judge's output block attached below solutions */}
        <JudgeEvaluation judgeData={data.judge} />
      </div>
    </div>
  );
}
