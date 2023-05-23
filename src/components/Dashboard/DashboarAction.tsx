
const DashboardAction = () => {
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
            <div className="search-btn">
                <button className="bg-colorPrimary px-4 py-2 text-white hover:bg-green-700 rounded-xl">Add Post</button>
            </div>
        </div>
    )
}

export default DashboardAction