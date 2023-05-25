import { FC, useRef, useState } from "react"
import AddPost from "./DashboardPost/AddPost"

type DashProp = {
    tab: String
}
const DashboardAction: FC<DashProp> = ({ tab }) => {
    const [postOpen, setpostOpen] = useState(false)
    const postOpenRef = useRef<HTMLDivElement | null>(null)
    const toggleAddPost = () => {
        setpostOpen((prevState) => !prevState);
    };
    return (
        <div className="flex items-center justify-between">
            <div className="flex pr-4">
                <button className="filter px-4 py-2 border font-bold rounded-md">
                    Filter
                </button>
                <div className="search">
                    <input className=" border-black border rounded-md p-4 ml-6" type="search" name="dash-search" id="" />
                </div>
            </div>
            <div ref={postOpenRef} id="addPost-root" />
            <div className="search-btn">
                <AddPost isOpen={postOpen} onClose={() => toggleAddPost()} addPostRoot={postOpenRef.current} />

                {tab === 'Users' && <button className="bg-colorPrimary px-4 py-2 text-white hover:bg-green-700 rounded-xl">Add User</button>}
                {tab === 'Posts' && <button className="bg-colorPrimary px-4 py-2 text-white hover:bg-green-700 rounded-xl" onClick={toggleAddPost}>Add post</button>}
                {tab === 'Events' && <button className="bg-colorPrimary px-4 py-2 text-white hover:bg-green-700 rounded-xl">Add event</button>}
                {tab === 'Comments' && <button className="bg-colorPrimary px-4 py-2 text-white hover:bg-green-700 rounded-xl">Add Comment</button>}
                {tab === 'Categories' && <button className="bg-colorPrimary px-4 py-2 text-white hover:bg-green-700 rounded-xl">Add Category</button>}
            </div>
        </div>
    )
}

export default DashboardAction