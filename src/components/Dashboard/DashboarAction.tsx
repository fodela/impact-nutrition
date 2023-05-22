
const DashboardAction = () => {
    return (
        <div className="flex items-center justify-between">
            <div className="p-2 flex pr-4">
                <div className="filter px-4 py-2 border font-bold rounded">
                    Filter
                </div>
                <div className="search">
                    <input className="border p-4 ml-6" type="search" name="dash-search" id="" />
                </div>
            </div>
            <div className="search-btn">
                <button className="bg-colorPrimary px-4 py-2 text-white hover:bg-green-700 rounded-xl">Add Post</button>
            </div>
        </div>
    )
}

export default DashboardAction