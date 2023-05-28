import { FC } from "react";
type renderButtonProps = {
    tab: string;
    toggleAddPost: () => void;
}

const renderAddButton: FC<renderButtonProps> = ({ tab, toggleAddPost }) => {
    if (tab === "Users") {
        return (
            <button className="bg-colorPrimary px-4 py-2 text-white hover:bg-green-700 rounded-xl">
                Add User
            </button>
        );
    } else if (tab === "Posts") {
        return (
            <button
                className="bg-colorPrimary px-4 py-2 text-white hover:bg-green-700 rounded-xl"
                onClick={toggleAddPost}
            >
                Add post
            </button>
        );
    } else if (tab === "Events") {
        return (
            <button className="bg-colorPrimary px-4 py-2 text-white hover:bg-green-700 rounded-xl">
                Add event
            </button>
        );
    } else if (tab === "Comments") {
        return (
            <button className="bg-colorPrimary px-4 py-2 text-white hover:bg-green-700 rounded-xl">
                Add Comment
            </button>
        );
    } else if (tab === "Categories") {
        return (
            <button className="bg-colorPrimary px-4 py-2 text-white hover:bg-green-700 rounded-xl">
                Add Category
            </button>
        );
    }

    return null; // Return null if the tab doesn't match any conditions
};

export default renderAddButton