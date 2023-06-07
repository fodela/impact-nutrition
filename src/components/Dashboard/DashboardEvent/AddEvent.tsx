import dynamic from "next/dynamic";
import { FC, MouseEvent } from "react";
import AddEventForm from "./AddEventForm";

type AddEventProp = {
    isOpen: boolean;
    onClose: () => void;
    addEventRoot: HTMLElement | null;
};

const handleSubElementClick = (e: MouseEvent) => {
    e.stopPropagation();
};

const AddEvent: FC<AddEventProp> = ({ isOpen, onClose, addEventRoot }) => {
    if (!isOpen || !addEventRoot) return null

    return (
        <>(
            <div
                className="fixed flex justify-center items-center w-screen inset-0 bg-gray-800 bg-opacity-50"
                onClick={onClose}
            >
                <div
                    onClick={handleSubElementClick}
                    className={`max-w-lg bg-white lg:m-6 rounded-lg lg:p-6 z-20 transform ${isOpen ? "translate-x-0" : "-translate-x-full"
                        } transition-transform duration-1000 ease-linear`}
                >
                    <h1 className="font-bold text-center uppercase text-2xl">
                        Add new Event
                    </h1>
                    <AddEventForm onClose={onClose} />
                </div>
            </div>
            )
        </>
    );
};

export default AddEvent;
