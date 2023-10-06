'use client'
import { createContext, useState } from "react";
import { ChildrenProps } from "../NextAuthProvider";
import { Post } from "@prisma/client";
import { getPosts, getPublishedPosts } from "@/lib/getPosts";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/ReactToastify.min.css";
interface GetPostsContextType {
    posts: Post[];
    pubPosts: Post[];
    getAllPosts: () => void;
    getAllPubPosts: () => void;
}
export const GetPostsContext = createContext<GetPostsContextType>({
    posts: [],
    pubPosts: [],
    getAllPubPosts: () => { },
    getAllPosts: () => { },
});




const GetSiteSettingProvider = ({ children }: ChildrenProps) => {
    const [pubPosts, setPubPosts] = useState<Post[]>([]);
    const [posts, setAllPosts] = useState<Post[]>([]);

    const getAllPubPosts = async () => {
        try {
            const posts: Post[] = await getPublishedPosts();
            setPubPosts(posts);
        } catch (error) {
            toast.error("Unable to get posts. check your internet", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            })
        }

    };

    const getAllPosts = async () => {
        try {
            const publishedPosts: Post[] = await getPosts();
            setAllPosts(publishedPosts);
        } catch (error) {
            toast.error("Unable to get posts. check your internet", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            })
        }

    };
    return (
        <GetPostsContext.Provider value={{ posts, getAllPosts, pubPosts, getAllPubPosts }}>
            <ToastContainer />
            {children}
        </GetPostsContext.Provider>

    );
};

export default GetSiteSettingProvider;
