
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import { Draggable, Droppable } from "react-beautiful-dnd";
import TodoCard from "./TodoCard";
import { useBoardStore } from "@/zustand/store/MainBodyStore";
import { useModalStore } from "@/zustand/store/ModalStore";

const idToColumnText: {
  [key in TypedCol]: string;
} = {
  todo: "To Do",
  inProgress: "In Progress",
  completed: "Completed",
};

const Column = ({ id, todos, index }: ColumnProps) => {

  const [searchString] = useBoardStore((state) => [state.searchString]);
  const [openModal] = useModalStore((state) => [state.openModal]);

  return (
    <Draggable draggableId={id.toString()} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          {/* the droppable id has to be a string */}
          <Droppable droppableId={index.toString()} type="card">
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className={`rounded-2xl p-2 shadow-xl ${snapshot.isDraggingOver ? "bg-blue-300/70" : "bg-white/50"
                  }`}
              >
                <h2 className="flex justify-between p-2 text-xl font-bold">
                  {idToColumnText[id]}
                  <span className="rounded-full bg-gray-200 px-2 py-1 text-sm text-gray-500 ">
                    {!searchString && todos.length}
                    {searchString && todos.filter((todo) => todo.title.toLowerCase().includes(searchString.toLowerCase())).length}
                  </span>
                </h2>
                <div className="space-y-2">
                  {todos.map((todo, index) => {
                    if(searchString && !todo.title.toLowerCase().includes(searchString.toLowerCase())){
                      return null;
                    }
                  
                  return(
                    <Draggable
                      draggableId={todo.$id.toString()}
                      index={index}
                      key={todo.$id}
                    >
                      {(provided) => (
                        <TodoCard
                          draggableProps={provided.draggableProps}
                          dragHandleProps={provided.dragHandleProps}
                          innerRef={provided.innerRef}
                          todo={todo}
                          index={index}
                          id={id}
                        />
                      )}
                    </Draggable>
                  )})}
                  {/* it makes space for a draggable component */}
                  {provided.placeholder}


                  <div className="flex items-end justify-end p-2">
                    <button onClick={openModal} className="text-green-500 hover:text-green-600 transition-colors 300ms">
                      <PlusCircleIcon
                        className="h-8 w-8 " />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
};

export default Column;
