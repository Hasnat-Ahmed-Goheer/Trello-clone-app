
const setTodosForAI =  (board: BoardType) => {

    const todos = Array.from(board.column.values()).reduce((acc, col) => { 
        acc.push(...col.todos);
        return acc;
    }
    , [] as Todo[]);

    return todos
}

export default setTodosForAI;