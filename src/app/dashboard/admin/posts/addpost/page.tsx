import AddPostForm from "@/components/Dashboard/DashboardPost/AddPostForm";

// const handleSubElementClick = (e: React.MouseEvent) => {
//     e.stopPropagation();
// };
const AddPost = () => {
    return (
        <div className=" flex justify-center items-center bg-gray-800">
            <div
                // onClick={handleSubElementClick}
                className={`bg-white dark:bg-black lg:m-6 rounded-lg lg:p-6`}
            >
                <h1 className="font-bold text-center uppercase text-2xl">Add new Post</h1>
                <AddPostForm />
            </div>
        </div>
    );
};

export default AddPost;
