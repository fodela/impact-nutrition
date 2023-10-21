import AddPostForm from "@/components/Dashboard/DashboardPost/AddPostForm";

// const handleSubElementClick = (e: React.MouseEvent) => {
//     e.stopPropagation();
// };
const AddPost = () => {
    return (
        <div className="fixed flex justify-center items-center w-screen inset-0 bg-gray-800 bg-opacity-50">
            <div
                // onClick={handleSubElementClick}
                className={`max-w-lg bg-white lg:m-6 rounded-lg lg:p-6 z-20 transform transition-transform duration-1000 ease-linear`}
            >
                <h1 className="font-bold text-center uppercase text-2xl">Add new Post</h1>
                <AddPostForm />
            </div>
        </div>
    );
};

export default AddPost;
