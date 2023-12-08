import { database } from "../appwrite/appwrite";

export const getTodosGroupedByColumn = async () => {
  const data = await database.listDocuments(
    process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
    process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID!,
  );
  const todos = data.documents;

  const columns = todos.reduce((acc, todo) => {
    if (!acc.get(todo.status)) {
      acc.set(todo.status, {
        id: todo.status,
        todos: [],
      });
    }

    acc.get(todo.status)!.todos.push({
      $id: todo.$id,
      $createdAt: todo.$createdAt,
      title: todo.title,
      status: todo.status,
      ...(todo.image && { image: JSON.parse(todo.image) }),
    });

    return acc;
  }, new Map<TypedCol, Column>());

  const colTypes: TypedCol[] = ["todo", "inProgress", "completed"];

  for (const col of colTypes) {
    if (!columns.get(col)) {
      columns.set(col, {
        id: col,
        todos: [],
      });
    }
  }

  const sortedColumns = new Map(
    Array.from(columns.entries()).sort(
      (a, b) => colTypes.indexOf(a[0]) - colTypes.indexOf(b[0]),
    ),
  );

  const board: BoardType = {
    column: sortedColumns,
  };

  return board;
};
