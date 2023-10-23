import dynamic from "next/dynamic";
import { FC, memo } from "react";
import { Event } from "@prisma/client";
import UpdateEventForm from "./UpdateEventForm";

type UpdatePostProp = {
    isOpen: boolean;
    onClose: () => void;
    event: Event;
};

const UpdatePostForm = dynamic(
    () => import("./UpdateEventForm"),
    { ssr: false }
);

const handleSubElementClick = (e: React.MouseEvent) => {
    e.stopPropagation();
};

const UpdatePost: FC<UpdatePostProp> = ({
    isOpen,
    onClose,
    event
}) => {
    if (!isOpen) return null;

    return (
        <div
            className="fixed dark:text-black flex justify-center items-center  inset-0 bg-gray-800 bg-opacity-50"
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
                <UpdateEventForm onClose={onClose} event={event} />
            </div>
        </div>
    );
};

export default memo(UpdatePost);
