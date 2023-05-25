import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import dynamic from "next/dynamic";
import { FC, useState } from "react";
import { FaLandmark } from "react-icons/fa";
import "suneditor/dist/css/suneditor.min.css"; // Import SunEditor CSS
import axios from "axios";

interface FormProps {
    title: string;
    content: string;
    slug: string;
    author?: string;
    authorId?: string;
    imageUrl: string;
    published: boolean;
}
type AddPostProp = {
    onClose: () => void
}
const SunEditor = dynamic(() => import("suneditor-react"), {
    ssr: false,
});


export const createPost = async (title: string, content: string, slug: string, imageUrl: string, published: boolean) => {
    const headers = {
        Accept: "*/*",
        "Content-Type": "application/json",
    };

    const body = JSON.stringify({
        title,
        content,
        slug,
        imageUrl,
        published,
    });

    try {
        const response = await axios.post("http://localhost:3000/api/blog", body, {
            headers,
        });

        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log("post error", error);
        throw error;
    }
};



const AddPostForm: FC<AddPostProp> = ({ onClose }) => {
    const [error, setError] = useState(false)

    const [postInputs, setPostInputs] = useState<FormProps>({
        title: "",
        content: "",
        slug: "",
        imageUrl: "",
        published: false,
    });

    const {
        title,
        content,
        slug,
        imageUrl,
        published,
    } = postInputs;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const post = await createPost(
                title,
                content,
                slug,
                imageUrl,
                published,
            )

            setError(false)
            setPostInputs({
                title: "",
                content: "",
                slug: "",
                imageUrl: "",
                published: false,
            })
            // onClose()
            console.log(post, "post")
        } catch (error) {
            setError(true)
        }

    };

    const handleContentChange = (content: string) => {
        setPostInputs((prevState) => ({
            ...prevState,
            content: content,
        }));
    };

    return (
        <div>
            {error && <div className="bg-red-600 text-white">{error}</div>}
            <form className="p-4" onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="title" className="block mb-2 font-bold">
                        Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        className="w-full px-4 py-2 border rounded-lg"
                        value={title}
                        onChange={(e) =>
                            setPostInputs((prevState) => ({
                                ...prevState,
                                title: e.target.value,
                            }))
                        }
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
                        id="slug"
                        className="w-full px-4 py-2 border rounded-lg"
                        value={slug}
                        onChange={(e) =>
                            setPostInputs((prevState) => ({
                                ...prevState,
                                slug: e.target.value,
                            }))
                        }
                    />
                </div>


                <div className="mb-4">
                    <label htmlFor="imageUrl" className="block mb-2 font-bold">
                        Image URL
                    </label>
                    <input
                        type="text"
                        id="imageUrl"
                        className="w-full px-4 py-2 border rounded-lg"
                        value={imageUrl}
                        onChange={(e) =>
                            setPostInputs((prevState) => ({
                                ...prevState,
                                imageUrl: e.target.value,
                            }))
                        }
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

export default AddPostForm;