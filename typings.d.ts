interface BoardType {
  column: Map<TypedCol, Column>;
}

type TypedCol = "todo" | "inProgress" | "completed";

interface Column {
  id: TypedCol;
  todos: Todo[];
}

interface Todo {
  $id: string;
  $createdAt: string;
  title: string;
  status: string;
  image?: Image;
}

interface Image {
  $bucketId: string;
  $fileId: string;
}

interface ColumnProps extends Column {
  index: number;
}

interface TodoCardProps {
  todo: Todo;
  index: number;
  id: TypedCol;
  innerRef: (element: HTMLElement | null) => void;
  draggableProps: DraggableProvidedDraggableProps;
  dragHandleProps: DraggableProvidedDragHandleProps | undefined | null;
}
