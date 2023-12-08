import setTodosForAI from "./setTodosForAI";

const fetchSuggestionHandler = async (board: BoardType) => {
  const todos = setTodosForAI(board);

  const response = await fetch("/api/generateSummary", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ todos }),
  });

  // Check if the response is ok and handle errors
  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Error from server: ${error}`);
  }

  const data = await response.json();
  
  
  return data.content;
};

export default fetchSuggestionHandler;
