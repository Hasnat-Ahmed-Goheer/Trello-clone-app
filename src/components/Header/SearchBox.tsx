'use client';
import { useBoardStore } from "@/zustand/store/MainBodyStore";
import {
  MagnifyingGlassIcon
} from "@heroicons/react/24/outline";
import { TrashIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import Avatar from "react-avatar";



const SearchBox = () => {

  const [input, setInput] = useState('');
  const [state, setState] = useState('');
  const [ ,setSearchString] = useBoardStore((state) => [
    state.searchString,
    state.setSearchString,
  ]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchString(input);
    setState(input);
    setInput('');

  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    setSearchString(e.target.value);

  }

  const handleRemoveFilter = () => {
    setSearchString('');
    setState('');
  }

  return (
    <div className="p-2 flex flex-1 space-x-4 justify-end">
      {state && <button onClick={handleRemoveFilter}
        className="bg-red-500 hover:bg-red-600 text-white hover:text-white transition-colors 300ms rounded-lg flex p-2 font-semibold items-center"  >
        <TrashIcon className="h-5 w-5 mr-1 " />
        {
          state.toUpperCase()
        }
      </button>}
      <form
        onSubmit={handleSubmit}
        className=" flex flex-1 items-center space-x-3 rounded-md bg-white shadow-lg md:flex-initial "
      >
        <MagnifyingGlassIcon className="h-6 w-6 pl-1 text-gray-400" />
        <input
          type="text"
          placeholder="Search"
          value={input}
          onChange={handleChange}
          className=" flex-1 rounded-md p-2 outline-none"
        />
        <button type="submit" hidden>
          Search
        </button>
      </form>

      {/* Avatar */}
      <>
        <Avatar name="Hasnat Ahmed" round color="#005501"
          size="45" />
      </>
    </div>
  );
};

export default SearchBox;
