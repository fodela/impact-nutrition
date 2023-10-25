'use client'
import UpdateEvent from "@/components/Dashboard/DashboardEvent/UpdateEvent";


const AddEvent = () => {
    return (
        <>
            <div
                className="f"
            >
                <div
                    className={`dark:text-black bg-white`}
                >
                    <h1 className="font-bold text-center uppercase text-2xl">
                        Update an Event
                    </h1>
                    <UpdateEvent />
                </div>
            </div>
        </>
    );
};

export default AddEvent;
