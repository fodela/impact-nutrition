'use client'
import { FC, useRef, useState } from "react";
import AddPost from "../DashboardPost/AddPost";
type renderButtonProps = {
    tab: string;
}

const RenderAddButton: FC<renderButtonProps> = ({ tab }) => {
    const [isPostOpen, setPostOpen] = useState(false);
    const postOpenRef = useRef<HTMLDivElement | null>(null);

    const toggleAddPost = () => {
        setPostOpen((prevState) => !prevState);
    };

    return (
        <div>
            <div ref={postOpenRef} id="addPost-root" />
            <AddPost
                isOpen={isPostOpen}
                onClose={toggleAddPost}
                addPostRoot={postOpenRef.current}
            />
            {
                (tab === "Users") && (<button className="bg-colorPrimary px-4 py-2 text-white hover:bg-green-700 rounded-xl">
                    Add User
                </button>)
            }
            {
                (tab === "Posts") && <button
                    className="bg-colorPrimary px-4 py-2 text-white hover:bg-green-700 rounded-xl"
                    onClick={toggleAddPost}
                >
                    Add post
                </button>
            }
            {
                (tab === "Event") && (
                    <button className="bg-colorPrimary px-4 py-2 text-white hover:bg-green-700 rounded-xl">
                        Add event
                    </button>
                )
            }

            {
                (tab === "Comments") && (
                    <button className="bg-colorPrimary px-4 py-2 text-white hover:bg-green-700 rounded-xl">
                        Add Comment
                    </button>
                )
            }
            {
                (tab === "Categories") && (
                    <button className="bg-colorPrimary px-4 py-2 text-white hover:bg-green-700 rounded-xl">
                        Add Category
                    </button>
                )
            }

        </div>
    )

};

export default RenderAddButton