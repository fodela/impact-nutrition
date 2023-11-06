'use client'

import UpdateEventForm from "@/components/Dashboard/DashboardEvent/UpdateEventForm";


const AddEvent = () => {
    return (
        <>
            <div
                className="f"
            >
                <div
                    className={`dark:text-black bg-white`}
                >
                    <UpdateEventForm />
                </div>
            </div>
        </>
    );
};

export default AddEvent;
