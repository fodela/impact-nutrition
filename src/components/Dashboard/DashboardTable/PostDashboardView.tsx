import TableRow from "./TableRow";
import Pagination from "./Pagination";
import TableHeader from "./TableHeader";
import { UserDetail } from "../../../../types";
import { Post } from "@prisma/client";
import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  useTransition,
} from "react";
import { GetPostsContext } from "@/components/context/PostContext";
import { toast } from "react-toastify";
import { deletePost } from "@/lib/getPosts";
import EventTableRow from "../DashboardEvent/EventTableRow";
import { FiEdit3 } from "react-icons/fi";
import { TfiTrash } from "react-icons/tfi";
import RowStatus from "./RowStatus";
import { BiSearch } from "react-icons/bi";
import { TbMessagePlus } from "react-icons/tb";

const postsTableHeadings = [
  "#",
  "Title",
  "Author",
  "Date Created",
  "Status",
  "Actions",
];

const PostsDashboardView = () => {
  const { posts, getAllPosts } = useContext(GetPostsContext);
  const [updatePost, setUpdatePost] = useState(false);
  const postUpdateRef = useRef<HTMLDivElement | null>(null);

  const [startTransition, isPending] = useTransition();

  const toggleUpdatePost = useCallback(() => {
    setUpdatePost((prevState) => !prevState);
  }, []);

  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const memoizedSelectedPost = useMemo(() => selectedPost, [selectedPost]);

  useEffect(() => {
    getAllPosts();
  }, []);

  const handleDelete = useCallback(
    async (id: string) => {
      const post = posts.find((pst) => pst.id === id);
      //@ts-ignore
      setSelectedPost(post!);
      try {
        await deletePost(post?.id!);
        const notify = () => toast.success("Post Deleted!");
        getAllPosts();
        notify();
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
    },
    [posts]
  );

  const handleUpdate = useCallback(
    (id: string) => {
      const post = posts.find((pst) => pst.id === id);
      if (post?.title) {
        //@ts-ignore
        setSelectedPost(post);
        toggleUpdatePost();
      }
    },
    [posts, toggleUpdatePost]
  );

  return (
    <>
      <h2 className="heading_tertiary">Blog Posts</h2>
      <div className="flex justify-between">
        <div className="bg-white px-2 dark:bg-white/10 shadow-lg flex rounded-lg  items-center">
          <input
            type="search"
            className="p-3 rounded-full bg-transparent"
            placeholder="Search post"
          />
          <BiSearch size={25} className="opacity-30" />
        </div>
        <button className="btn_primary flex gap-1 items-center">
          Add Post <TbMessagePlus size={25} />
        </button>
      </div>

      <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5 divide-y-2">
        <table className="w-full border-collapse  text-left text-sm">
          <TableHeader headings={postsTableHeadings} />
          {/* <TableHeader /> */}
          <tbody className="divide-y divide-gray-100 border-t border-gray-100">
            {posts.map((postDetail, index) => (
              <tr key={index} className="hover:bg-inherit/80 opacity-80">
                <td className="px-6 py-4 opacity-40 capitalize">{index + 1}</td>
                <td className="px-6 py-4 capitalize font-bold text-lg opacity-100">
                  {postDetail.title}
                </td>

                <td className="px-6 py-4 capitalize opacity-95">
                  {postDetail.authorId}
                </td>
                <td className="px-6 py-4 capitalize">
                  {formatDate(postDetail.createAt)}
                </td>

                <RowStatus
                  status={postDetail.published ? "published" : "draft"}
                />

                <td className="px-6 py-4 ">
                  <div className="flex gap-2">
                    <FiEdit3 size={25} />
                    <TfiTrash size={25} className="text-red-500" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination />
      </div>
    </>
  );

  function formatDate(rawDate: string | Date) {
    const date = new Date(rawDate);

    const dd = String(date.getUTCDate()).padStart(2, "0"); // Day
    const mm = String(date.getUTCMonth() + 1).padStart(2, "0"); // Month (+1 because months are zero-based)
    const yy = String(date.getUTCFullYear()).slice(-2); // Last two digits of the year

    const formattedDate = `${dd}/${mm}/${yy}`;
    return formattedDate;
  }
};

export default PostsDashboardView;
