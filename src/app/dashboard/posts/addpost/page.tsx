'use client'
import AddPostForm from "@/components/Dashboard/DashboardPost/AddPostForm";


const AddPost = () => {
    return (
        <>
            <div
                className="post"
            >
                <div
                    className={`lg:m-6 rounded-lg lg:p-6 transform transition-transform duration-1000 ease-linear`}
                >
                    <h1 className="font-bold text-center uppercase text-2xl">
                        Add new Post
                    </h1>
                    <AddPostForm />
                </div>
            </div>
        </>
    );
};

export default AddPost;
