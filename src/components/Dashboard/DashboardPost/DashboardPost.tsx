import { useState, useEffect, useRef, useTransition, useCallback, useMemo } from 'react';
import { getPosts } from '@/lib/getPosts';
import 'suneditor/dist/css/suneditor.min.css';
import UpdatePost from './UpdatePost';
import axios from 'axios';
import { toast } from 'react-toastify';

export interface Post {
    id?: string;
    title: string;
    content: string;
    slug: string;
    author?: string;
    authorId?: string;
    imageUrl: string;
    published: boolean;
}

const deletePost = async (id: string) => {
    const headersList = {
        "Accept": "*/*",
    };

    const reqOptions = {
        url: `http://localhost:3000/api/blog?id=${id}`,
        method: "DELETE",
        headers: headersList,
    };

    try {
        const response = await axios.request(reqOptions);
        return response.data;
    } catch (error) {
        throw error;
    }
};

const DashboardPost = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [updatePost, setUpdatePost] = useState(false);
    const postUpdateRef = useRef<HTMLDivElement | null>(null);

    const [startTransition, isPending] = useTransition();

    const toggleUpdatePost = useCallback(() => {
        setUpdatePost(prevState => !prevState);
    }, []);

    const [selectedPost, setSelectedPost] = useState<Post | null>(null);
    const memoizedSelectedPost = useMemo(() => selectedPost, [selectedPost]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const fetchedPosts = await getPosts();
                setPosts(fetchedPosts);
            } catch (error) {
                const notify = () => toast.error("unable to get posts!", {
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

        fetchPosts();
    }, []);

    const handleDelete = useCallback(async (id: string) => {
        const post = posts.find(pst => pst.id === id);
        setSelectedPost(post!);
        try {
            await deletePost(post?.id!);
            const notify = () => toast.success("Post Deleted!");
            notify();
        } catch (error) {
            const notify = () => toast.error("Something went wrong!", {
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
    }, [posts]);

    const handleUpdate = useCallback((id: string) => {
        const post = posts.find(pst => pst.id === id);
        if (post?.title) {
            setSelectedPost(post);
            toggleUpdatePost();
        }
    }, [posts, toggleUpdatePost]);

    return (
        <div className="p-4 max-w-screen-xl mx-auto">
            {(!posts.length) && <div>Loading!</div>}
            <table className="w-full">
                <thead className='p-4 m-4 bg-slate-300 rounded-xl border'>
                    <tr>
                        <th>Title</th>
                        <th>Content</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {posts.map((post) => (
                        <tr className='p-4 m-4' key={post.id}>
                            <UpdatePost isOpen={updatePost}
                                onClose={toggleUpdatePost}
                                //@ts-ignore
                                post={memoizedSelectedPost}
                                //@ts-ignore
                                postUpdateRoot={postUpdateRef} />
                            <td>{post.title}</td>
                            <td> <div dangerouslySetInnerHTML={{ __html: post.content }} /></td>
                            <td>
                                <div className="flex justify-end">
                                    <button
                                        onClick={() => handleDelete(post.id!)}
                                        className="bg-red-500 text-white px-4 py-2 mr-2 rounded-md"
                                    >
                                        Delete
                                    </button>
                                    <button
                                        id={post.id}
                                        onClick={() => handleUpdate(post.id!)}
                                        className="bg-blue-500 text-white px-4 py-2 rounded-md"
                                    >
                                        Update
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DashboardPost;