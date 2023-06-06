import dynamic from "next/dynamic";
import { FC, useState, ChangeEvent, FormEvent, memo } from "react";
import { toast } from 'react-toastify';
import axios from "axios";
import 'suneditor/dist/css/suneditor.min.css';

interface FormProps {
    title: string;
    details: string;
    location: string;
    organizers: string;
    image: string;
}

type AddPostProp = {
    onClose: () => void;
};

const SunEditor = dynamic(() => import("suneditor-react"), {
    ssr: false,
});

export const createEvent = async (formData: FormProps) => {
    const headers = {
        Accept: "*/*",
        "Content-Type": "application/json",
    };
    const response = await axios.post(`/api/events`, formData, {
        headers,
    });
    return response.data;
};

const AddEventForm: FC<AddPostProp> = ({ onClose }) => {
    const [eventInputs, setEventInputs] = useState<FormProps>({
        title: "",
        details: "",
        location: "",
        organizers: "",
        image: ""
    });

    const {
        title,
        details,
        location,
        organizers,
        image, } = eventInputs;

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            console.log('erv', eventInputs)
            const event = await createEvent(eventInputs);
            setEventInputs({
                title: "",
                details: "",
                location: "",
                organizers: "",
                image: "",
            });
            const notify = () => toast.success("Event created!");
            notify();
            onClose();
        } catch (error) {
            const notify = () => {
                //@ts-ignore
                toast.error("Something went wrong!", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });

            }
            notify();
        }
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEventInputs((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleContentChange = (details: string) => {
        console.log(details, 'ss')
        setEventInputs((prevState) => ({
            ...prevState,
            details: details,
        }));
    };

    return (
        <div>
            <form className="p-4" onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="title" className="block mb-2 font-bold">
                        Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        required
                        className="w-full px-4 py-2 border rounded-lg"
                        name="title"
                        value={title}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="details" className="block mb-2 font-bold">
                        details
                    </label>
                    <SunEditor
                        placeholder="Please type here..."
                        onChange={handleContentChange}
                        setContents={details}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="location" className="block mb-2 font-bold">
                        Location
                    </label>
                    <input
                        type="text"
                        required
                        id="location"
                        className="w-full px-4 py-2 border rounded-lg"
                        name="location"
                        value={location}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="image" className="block mb-2 font-bold">
                        Image URL
                    </label>
                    <input
                        type="text"
                        id="image"
                        className="w-full px-4 py-2 border rounded-lg"
                        name="image"
                        value={image}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="organizers" className="block mb-2 font-bold">
                        Organizers
                    </label>
                    <input
                        required
                        type="text"
                        id="organizers"
                        className="w-full px-4 py-2 border rounded-lg"
                        name="organizers"
                        value={organizers}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="flex">
                    <button
                        type="submit"
                        className="px-4 py-2 mr-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
                    >
                        Submit
                    </button>
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 text-gray-600 bg-gray-200 rounded-lg hover:bg-gray-300"
                    >
                        Close
                    </button>
                </div>
            </form>
        </div>
    );
};

export default memo(AddEventForm);
