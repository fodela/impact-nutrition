'use client'
import AddEventForm from "@/components/Dashboard/DashboardEvent/AddEventForm";


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
                        Add new Event
                    </h1>
                    <AddEventForm />
                </div>
            </div>
        </>
    );
};

export default AddEvent;
