'use client'
import { FC, useRef, useState } from "react";
import AddPost from "../DashboardPost/AddPost";
import AddEvent from "../DashboardEvent/AddEvent";
type renderButtonProps = {
    tab: string;
}

const RenderAddButton: FC<renderButtonProps> = ({ tab }) => {
    const [isPostOpen, setPostOpen] = useState(false);
    const postOpenRef = useRef<HTMLDivElement | null>(null);

    const toggleAddPost = () => {
        setPostOpen((prevState) => !prevState);
    };

    const [isEventOpen, setEventOpen] = useState(false);
    const eventOpenRef = useRef<HTMLDivElement | null>(null);

    const toggleAddEvent = () => {
        setEventOpen((prevState) => !prevState);
    };

    return (
        <div>
            <div ref={postOpenRef} id="addPost-root" />
            <div ref={eventOpenRef} id="addEvent-root" />
            <AddPost
                isOpen={isPostOpen}
                onClose={toggleAddPost}
                addPostRoot={postOpenRef.current}
            />
            <AddEvent
                isOpen={isEventOpen}
                onClose={toggleAddEvent}
                addEventRoot={eventOpenRef.current}
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
                (tab === "Events") && (
                    <button className="bg-colorPrimary px-4 py-2 text-white hover:bg-green-700 rounded-xl"
                        onClick={toggleAddEvent}>
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