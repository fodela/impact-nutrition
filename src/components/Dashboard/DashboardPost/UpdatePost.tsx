import dynamic from "next/dynamic";
import { FC, memo } from "react";
import { Post } from "./DashboardPost";

type UpdatePostProp = {
    isOpen: boolean;
    onClose: () => void;
    post: Post;
};

const UpdatePostForm = dynamic(
    () => import("./UpdatePostForm"),
    { ssr: false }
);

const handleSubElementClick = (e: React.MouseEvent) => {
    e.stopPropagation();
};

const UpdatePost: FC<UpdatePostProp> = ({
    isOpen,
    onClose,
    post
}) => {
    if (!isOpen) return null;

    return (
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
                    Add new Post
                </h1>
                <UpdatePostForm onClose={onClose} post={post} />
            </div>
        </div>
    );
};

export default memo(UpdatePost);
