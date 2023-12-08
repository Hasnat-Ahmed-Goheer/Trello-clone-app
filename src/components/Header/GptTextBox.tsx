'use client';
import fetchSuggestionHandler from "@/utils/fetchSuggestionHandler";
import setTodosForAI from "@/utils/setTodosForAI";
import { useBoardStore } from "@/zustand/store/MainBodyStore";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";




const GptTextBox = () => {
  const [board] = useBoardStore((state) => [state.board]);
  const [loading, setLoading] = useState<boolean>(false);
  const [suggestion, setSuggestion] = useState<string>('');
  useEffect(() => {
    if (board.column.size === 0) {
      return;
    }
    setLoading(true);
    const fetchSuggestion = async () => {
      
      const suggestion = await fetchSuggestionHandler(board);
      
      setSuggestion(suggestion);
      setLoading(false);
      
    }

    fetchSuggestion();
  }, [
    board
  ]);

  return (
    <div className="flex items-center justify-center px-5 py-2 md:py-5">
      <p className="text-md w-fit max-w-3xl space-x-2  bg-white rounded-2xl p-2 text-[#0055D1] shadow-xl md:p-4">
        <UserCircleIcon className={`inline-block h-10 w-10 ${loading && 'animate-spin'}` } />
        <span className="italic transition-all 2ms">
          {suggestion && !loading ? suggestion : 'GPT is summarizing your tasks for the day...'}
        </span>
      </p>
    </div>
  );
};

export default GptTextBox;


