import dynamic from "next/dynamic";
import { FC, useState } from "react";
import AddPostForm from "./AddPostForm";

type AddPostProp = {
    isOpen: boolean;
    onClose: () => void;
    addPostRoot: HTMLElement | null;
};

const handleSubElementClick = (e: React.MouseEvent) => {
    e.stopPropagation();
};
const AddPost: FC<AddPostProp> = ({ isOpen, onClose, addPostRoot }) => {

    if (!isOpen || !addPostRoot) return null;

    return (
        <div className="fixed flex justify-center items-center w-screen inset-0 bg-gray-800 bg-opacity-50" onClick={() => {
            onClose()
        }}>
            <div onClick={handleSubElementClick}
                className={`max-w-lg bg-white lg:m-6 rounded-lg lg:p-6 z-20 transform ${isOpen ? "translate-x-0" : "-translate-x-full"
                    } transition-transform duration-1000 ease-linear`}
            >
                <h1 className="font-bold text-center uppercase text-2xl">Add new Post</h1>
                <AddPostForm onClose={onClose} />
            </div>
        </div>
    );
};

export default AddPost;
