
import UpdateEventForm from "./UpdateEventForm";



const UpdateEvent = () => {
    return (
        <div
            className="dark:text-black flex justify-center items-center  inset-0 bg-gray-800 bg-opacity-50"
        >
            <div
                className={`bg-white lg:m-6 rounded-lg lg:p-6 z-20 transform transition-transform duration-1000 ease-linear`}
            >
                <h1 className="font-bold text-center uppercase text-2xl">
                    Update Event
                </h1>
                <UpdateEventForm />
            </div>
        </div>
    );
};

export default UpdateEvent;
