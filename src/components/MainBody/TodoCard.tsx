'use client'
import getUrl from "@/utils/getUrl";
import { useBoardStore } from "@/zustand/store/MainBodyStore"
import { CheckIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/solid"
import { useEffect, useState } from "react";
import Image from "next/image";


const TodoCard = ({ id, index, todo, innerRef, dragHandleProps, draggableProps }: TodoCardProps) => {

  const [deleteTodo] = useBoardStore((state) => [state.deleteTodo]); 

  const [imageUrl, setImageUrl] = useState<string | null>(null);

useEffect(() => {
  if(todo.image){
    const fetchImage = async () => {
      const url = await getUrl(todo.image!);
      if(url){
        setImageUrl(url.toString());

      }
    }
    fetchImage();
  }

}, [todo]);

  return (
    <div
      {...dragHandleProps}
      {...draggableProps}
      ref={innerRef}
      className="bg-white rounded-lg shadow-md space-y-2">
      <div className="flex flex-col items-start justify-between p-3">
        {imageUrl && (
          <div className="h-full w-full rounded-b-md shadow-md">
            <Image
            src={imageUrl}
            alt = 'preview'
            width={400}
            height={200}
            className="w-full object-contain rounded-b-md"/>
          </div>
        ) }
      <div className="flex w-full  justify-between p-2">
          <h3 className="text-lg font-semibold">{todo.title}</h3>
          {/* <DotsVerticalIcon className="h-5 w-5" /> */}
          <button onClick={() => deleteTodo(index, todo, id)} className="text-red-500 hover:text-red-600 transition-colors 300ms">
            <TrashIcon className="h-5 w-5" />
          </button>
      </div>

        {/* image will be placed here */}
        
      </div>
    </div>
  )
}

export default TodoCard