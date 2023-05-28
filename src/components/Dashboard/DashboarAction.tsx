import { FC, useRef, useState } from "react";
import AddPost from "./DashboardPost/AddPost";
import { ToastContainer, toast, ToastContainerProps } from "react-toastify";
import "react-toastify/ReactToastify.min.css";
import renderAddButton from "./DashboardTable/RenderButtons";

type DashProp = {
    tab: string;
};

const DashboardAction: FC<DashProp> = ({ tab }) => {
    const [isPostOpen, setPostOpen] = useState(false);
    const postOpenRef = useRef<HTMLDivElement | null>(null);

    const toggleAddPost = () => {
        setPostOpen((prevState) => !prevState);
    };

    const toastContainerOptions: ToastContainerProps = {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        newestOnTop: false,
        closeOnClick: true,
        rtl: false,
        pauseOnFocusLoss: true,
        draggable: true,
        pauseOnHover: true,
        theme: "colored",
    };



    return (
        <div>
            <div>
                <div className="flex items-center justify-between">
                    <div className="flex pr-4">
                        <button className="filter px-4 py-2 border font-bold rounded-md">
                            Filter
                        </button>
                        <div className="search">
                            <input
                                className="border-black border rounded-md p-4 ml-6"
                                type="search"
                                name="dash-search"
                                id=""
                            />
                        </div>
                    </div>
                    <div ref={postOpenRef} id="addPost-root" />
                    <div className="search-btn">
                        <AddPost
                            isOpen={isPostOpen}
                            onClose={toggleAddPost}
                            addPostRoot={postOpenRef.current}
                        />
                        {renderAddButton({ tab, toggleAddPost })}
                    </div>
                </div>
            </div>
            <ToastContainer {...toastContainerOptions} />
        </div>
    );
};

export default DashboardAction;
