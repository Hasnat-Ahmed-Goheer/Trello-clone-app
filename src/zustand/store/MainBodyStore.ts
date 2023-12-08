import { getTodosGroupedByColumn } from "@/utils/getTodosGroupedByColumn";
import { create } from "zustand";
import { ID, database, storage } from "../../appwrite/appwrite";
import uploadImage from "@/utils/uploadImage";

interface BoardStoreType {
  board: BoardType;
  searchString: string;
  newTask: string;
  image: File | null;
  taskType: TypedCol;
  setSearchString: (searchString: string) => void;
  getBoard: () => void;
  setBoardState: (board: BoardType) => void;
  updateTodoInDB: (todo: Todo, columnId: TypedCol) => void;
  deleteTodo: (taskIndex: number, todoId: Todo, columnId: TypedCol) => void;
  addTodo: (todo: string, columnId: TypedCol, image?: File | null) => void;
  addNewTask: (task: string) => void;
  setTaskType: (taskType: TypedCol) => void;
  setImage: (image: File | null) => void;
}
export const useBoardStore = create<BoardStoreType>((set, get) => ({
  board: {
    column: new Map<TypedCol, Column>(),
  },
  searchString: "",
  newTask: "",
  taskType: "todo",
  image: null,
  setSearchString: (searchString) => set({ searchString }),

  getBoard: async () => {
    const board = await getTodosGroupedByColumn();
    set({ board });
  },
  setBoardState: (board) => set({ board }),
  updateTodoInDB: async (todo, columnId) => {
    await database.updateDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID!,
      todo.$id,
      {
        title: todo.title,
        status: columnId,
      },
    );
  },
  deleteTodo: async (taskIndex, todo, columnId) => {
    const newCol = new Map(get().board.column);
    newCol.get(columnId)?.todos.splice(taskIndex, 1);
    set({ board: { column: newCol } });
    if(todo.image){
      await storage.deleteFile(todo.image.$bucketId,todo.image.$fileId);
    }

    //  add image deletion here


    // delete from db
    await database.deleteDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID!,
      todo.$id,
    );
  },
  addTodo: async (todo, columnId, image?:File |null) => {
    let file: Image = { $bucketId: "", $fileId: ""}
      if (image) {
      const fileUploaded = await uploadImage(image);
      if (fileUploaded) {
        file = {
          $bucketId: fileUploaded.bucketId,
          $fileId: fileUploaded.$id,
        };
      }
    }
    const {$id} = await database.createDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID!,
      ID.unique(),
      {
        title: todo,
        status: columnId,
        ...(file && { image: JSON.stringify(file) }),
      },
    );

    set({newTask: ""});
    set((state) => {
      const newCol = new Map(state.board.column);
      let newTodo: Todo;
      if(file)
      { newTodo = {
        $id,
        $createdAt : new Date().toISOString(),
        title: todo,
        status: columnId,
        image: file,
      }
    }
    else{
       newTodo = {
        $id,
        $createdAt: new Date().toISOString(),
        title: todo,
        status: columnId,
        image: file,
      };
    }
      const column = newCol.get(columnId);
      if(!column){
        newCol.set(columnId, {
          id: columnId,
          todos: [newTodo]
        })
      
    }else{
      newCol.get(columnId)?.todos.push(newTodo);
    }

    return {board: {column: newCol}}

    })
    
  },
  addNewTask: (task) => set({ newTask: task }),
  setTaskType: (taskType) => set({ taskType }),
  setImage: (image) => set({ image }),

}));
