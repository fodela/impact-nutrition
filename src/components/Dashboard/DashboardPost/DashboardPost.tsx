/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useState, useEffect, useRef, useTransition, useCallback, useMemo, useContext } from 'react';
import { getPosts } from '@/lib/getPosts';
import 'suneditor/dist/css/suneditor.min.css';
import UpdatePost from './UpdatePost';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { GetPostsContext } from '@/components/context/PostContext';

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
        url: `/api/blog?id=${id}`,
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
    const { posts, getAllPosts } = useContext(GetPostsContext);
    const [updatePost, setUpdatePost] = useState(false);
    const postUpdateRef = useRef<HTMLDivElement | null>(null);

    const [startTransition, isPending] = useTransition();

    const toggleUpdatePost = useCallback(() => {
        setUpdatePost(prevState => !prevState);
    }, []);

    const [selectedPost, setSelectedPost] = useState<Post | null>(null);
    const memoizedSelectedPost = useMemo(() => selectedPost, [selectedPost]);

    useEffect(() => {
        getAllPosts();
    }, []);

    const handleDelete = useCallback(async (id: string) => {
        const post = posts.find(pst => pst.id === id);
        //@ts-ignore
        setSelectedPost(post!);
        try {
            await deletePost(post?.id!);
            const notify = () => toast.success("Post Deleted!");
            getAllPosts()
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
            //@ts-ignore
            setSelectedPost(post);
            toggleUpdatePost();
        }
    }, [posts, toggleUpdatePost]);

    return (
        <div className="p-4 max-w-screen-xl mx-auto">
            <ToastContainer />
            <div className="relative flex justify-end">
                <a href="/dashboard/posts/addpost" className='p-3 rounded-lg bg-colorPrimary'> Add post</a>
            </div>

            {(!posts.length) && <div className='text-center'>Loading! posts</div>}
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

                            <td>
                                <div
                                    //@ts-ignore
                                    dangerouslySetInnerHTML={{ __html: post.content }} /></td>
                            <td>
                                <div className="flex justify-end">
                                    <button
                                        onClick={() => handleDelete(post.id!)}
                                        className="text-red-500 px-4 py-2 mr-2 rounded-md"
                                    >
                                        Delete
                                    </button>
                                    <button
                                        id={post.id}
                                        onClick={() => handleUpdate(post.id!)}
                                        className="text-blue-500 px-4 py-2 rounded-md"
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