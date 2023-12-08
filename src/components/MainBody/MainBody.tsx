"use client";
import { useBoardStore } from "@/zustand/store/MainBodyStore";
import { useEffect, useState } from "react";
import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";
import Column from "./Column";



const MainBody = () => {
  const [isClient, setIsClient] = useState(false);
  const [board, getBoard, setBoardState, updateTodoInDB] = useBoardStore((state) => [
    state.board,
    state.getBoard,
    state.setBoardState,
    state.updateTodoInDB
  ]);
  // const board = useBoardStore((state) => state.board);
  // console.log(board);
  useEffect(() => {
    getBoard();
    setIsClient(true);
  }, [getBoard]);

  const handleDragEnd = (result: DropResult) => {
    const { destination, source, type } = result;

    if (!destination) {
      return;
    }
    // for dragging the columns themselves
    if (type === 'column') {
      const entries = Array.from(board.column.entries());
      const [removed] = entries.splice(source.index, 1);
      entries.splice(destination.index, 0, removed);
      const newColumnOrder = new Map(entries);
      setBoardState({
        ...board,
        column: newColumnOrder,
      });
    }


    //  converting the array into a columns type object 
    const columns = Array.from(board.column);

    const sourceColIndex = columns[Number(source.droppableId)];
    const destinationColIndex = columns[Number(destination.droppableId)];


    const sourceColumn: Column = {
      id: sourceColIndex[0],
      todos: sourceColIndex[1].todos,
    }
    const destinationColumn: Column = {
      id: destinationColIndex[0],
      todos: destinationColIndex[1].todos,
    }
    if (!sourceColumn || !destinationColumn) {
      return;
    }

    if (source.index === destination.index && source.droppableId === destination.droppableId && sourceColumn === destinationColumn) {
      return;
    }

    const newSourceTodos = sourceColumn.todos;
    const [todoMoved] = newSourceTodos.splice(source.index, 1);

    if (sourceColumn.id === destinationColumn.id) {
      newSourceTodos.splice(destination.index, 0, todoMoved);

      const newColumn = {
        id: sourceColumn.id,
        todos: newSourceTodos,
      }

      const newColumnOrder = new Map(board.column);
      newColumnOrder.set(sourceColumn.id, newColumn);
      setBoardState({ ...board, column: newColumnOrder });

      // updating the database

    }
    else {
      const newDestinationTodos = destinationColumn.todos;
      newDestinationTodos.splice(destination.index, 0, todoMoved);


      const newColumn = {
        id: destinationColumn.id,
        todos: newDestinationTodos,
      }

      const newColumnOrder = new Map(board.column);
      newColumnOrder.set(destinationColumn.id, newColumn);
      setBoardState({ ...board, column: newColumnOrder });

      // updating the database
      updateTodoInDB(todoMoved, destinationColumn.id);
    }

  };

  return (
    // droppableId needs to be a string and all should be in small letters otherwise it wont work
    <>
      {isClient && <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable direction="horizontal"
          droppableId='main' type="column">
          {(provided) => (
            <div
              className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-7xl mx-auto"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {/* rendering all the columns here */}
              {board && Array.from(board?.column?.entries()).map(
                ([columnId, column], index) => (
                  <Column
                    key={columnId}
                    id={columnId}
                    todos={column.todos}
                    index={index}
                  />
                ),
              )}
            </div>
          )}
        </Droppable>
      </DragDropContext>}

    </>
  );
};

export default MainBody;
