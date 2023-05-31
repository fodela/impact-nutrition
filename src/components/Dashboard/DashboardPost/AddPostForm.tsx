import dynamic from "next/dynamic";
import { FC, useState, ChangeEvent, FormEvent, memo } from "react";
import { toast } from 'react-toastify';
import axios from "axios";
import 'suneditor/dist/css/suneditor.min.css';

interface FormProps {
    title: string;
    content: string;
    slug: string;
    imageUrl: string;
    published: boolean;
}

type AddPostProp = {
    onClose: () => void;
};

const SunEditor = dynamic(() => import("suneditor-react"), {
    ssr: false,
});

export const createPost = async (formData: FormProps) => {
    const headers = {
        Accept: "*/*",
        "Content-Type": "application/json",
    };

    try {
        const response = await axios.post(`${process.env.LOCALURL}/api/blog`, formData, {
            headers,
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

const AddPostForm: FC<AddPostProp> = ({ onClose }) => {
    const [postInputs, setPostInputs] = useState<FormProps>({
        title: "",
        content: "",
        slug: "",
        imageUrl: "",
        published: false,
    });

    const { title, content, slug, imageUrl, published } = postInputs;

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const post = await createPost(postInputs);

            setPostInputs({
                title: "",
                content: "",
                slug: "",
                imageUrl: "",
                published: false,
            });

            const notify = () => toast.success("Post created!");
            notify();
            onClose();
        } catch (error) {
            const notify = () =>
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
            notify();
        }
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPostInputs((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleContentChange = (content: string) => {
        setPostInputs((prevState) => ({
            ...prevState,
            content: content,
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
                    <label htmlFor="content" className="block mb-2 font-bold">
                        Content
                    </label>
                    <SunEditor
                        placeholder="Please type here..."
                        onChange={handleContentChange}
                        setContents={content}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="slug" className="block mb-2 font-bold">
                        Slug
                    </label>
                    <input
                        type="text"
                        required
                        id="slug"
                        className="w-full px-4 py-2 border rounded-lg"
                        name="slug"
                        value={slug}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="imageUrl" className="block mb-2 font-bold">
                        Image URL
                    </label>
                    <input
                        required
                        type="text"
                        id="imageUrl"
                        className="w-full px-4 py-2 border rounded-lg"
                        name="imageUrl"
                        value={imageUrl}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="published" className="block mb-2 font-bold">
                        Published
                    </label>
                    <label className="flex items-center">
                        <input
                            type="checkbox"
                            id="published"
                            className="mr-2"
                            name="published"
                            checked={published}
                            onChange={(e) =>
                                setPostInputs((prevState) => ({
                                    ...prevState,
                                    published: e.target.checked,
                                }))
                            }
                        />
                        Published
                    </label>
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

export default memo(AddPostForm);
