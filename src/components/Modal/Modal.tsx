'use client'
import { useBoardStore } from '@/zustand/store/MainBodyStore';
import { useModalStore } from '@/zustand/store/ModalStore';
import { Dialog, Transition } from '@headlessui/react';
import Image from 'next/image';
import { Fragment, useRef } from 'react';
import TaskTypeRadioGroup from './TaskTypeRadioGroup';
import { PhotoIcon } from '@heroicons/react/24/solid';

function Modal() {

    const imagePickerRef = useRef<HTMLInputElement>(null);
    const [isOpen, closeModal] = useModalStore((state) => [state.isOpen, state.closeModal]);
    const [addTodo, newTask, taskType, addNewTask, image, setImage] = useBoardStore((state) => [state.addTodo, state.newTask, state.taskType, state.addNewTask, state.image, state.setImage]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!newTask) {
            return;
        }

        addTodo(newTask, taskType, image);
        setImage(null);
        closeModal();
    }
    return (
        // Use the `Transition` component at the root level
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as='form'
                onSubmit={handleSubmit}
                className='relative z-10'
                onClose={closeModal}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/30" />
                </Transition.Child>
                {/*
          Use one Transition.Child to apply one transition to the backdrop...
        */}
                <div className='fixed inset-0 overflow-y-auto'>
                    <div className='flex min-h-full items-center justify-center p-4 text-center'>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                                <Dialog.Title as='h3' className='text-lg font-medium leading-6 text-gray-900 pb-2   '>
                                    Add a new task
                                </Dialog.Title>

                                <div className="mt-2">
                                    <input type="text"
                                        value={newTask}
                                        onChange={(e) => { addNewTask(e.target.value) }}
                                        aria-placeholder='Enter A new Task here....'
                                        className='w-full border border-gray-300 rounded-md outline-none focus-none p-5' />
                                </div>
                                <TaskTypeRadioGroup />
                                <div>
                                    <button
                                        type='button'
                                        onClick={() => { imagePickerRef.current?.click() }}
                                        className='w-full border border-gray-300 rounded-md outline-none p-5 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'>
                                        <PhotoIcon className="h-6 w-6 mr-2 inline-block" />
                                        Upload Image
                                    </button>

                                    {image && (
                                        <Image src={URL.createObjectURL(image)} alt="preview"
                                            width={200}
                                            height={200} className="w-full h-44 object-cover mt-2 filter hover:grayscale transition-all duration-150 cursor-not-allowed rounded-md"
                                            onClick={() => { setImage(null) }} />
                                    )}

                                </div>

                                <div>
                                    <input type="file"
                                        hidden
                                        ref={imagePickerRef}
                                        onChange={(e) => {
                                            if (!e.target.files![0].type.startsWith('image/'))
                                                return;
                                            setImage(e.target.files![0]);
                                        }}
                                    />
                                </div>
                                <div><button type='submit'
                                    disabled={!newTask}
                                    className='inline-flex 
                                mt-2 justify-center rounded-md border border-transparent
                                bg-blue-100 font-medium w-full text-blue-900 hover:bg-blue-200
                                focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500
                                disabled:opacity-50 disabled:cursor-not-allowed
                                disabled:cursor-not-allowed:text-gray-300 p-5'

                                >
                                    Add A Task</button></div>
                            </Dialog.Panel>
                        </Transition.Child>

                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}
export default Modal;