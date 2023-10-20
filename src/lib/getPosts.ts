import { FormProps } from "@/components/Dashboard/DashboardPost/AddPostForm";
import axios from "axios";

const getPosts = async () => {
  let headersList = {
    Accept: "*/*",
  };

  let reqOptions = {
    url: `/api/blog`,
    method: "GET",
    headers: headersList,
  };

  let response = await axios.request(reqOptions);
  return response.data;
};

const getPublishedPosts = async () => {
  let headersList = {
    Accept: "*/*",
  };

  let reqOptions = {
    url: `/api/blog/published`,
    method: "GET",
    headers: headersList,
  };

  let response = await axios.request(reqOptions);
  return response.data;
};

const getPostById = async (id: string) => {
  let headersList = {
    Accept: "*/*",
  };

  let reqOptions = {
    url: `/api/blog/${id}`,
    method: "GET",
    headers: headersList,
  };

  let response = await axios.request(reqOptions);
  return response.data;
};

const updatePOST = async (
  id: string,
  title: string,
  content: string,
  slug: string,
  imageUrl: string,
  published: boolean
) => {
  const headers = {
    Accept: "*/*",
    "Content-Type": "application/json",
  };

  const body = JSON.stringify({
    id,
    title,
    content,
    slug,
    imageUrl,
    published,
  });

  const response = await axios.put(`/api/blog`, body, {
    headers,
  });
  return response.data;
};

export const createPost = async (formData: FormProps) => {
  const headers = {
    Accept: "*/*",
    "Content-Type": "application/json",
  };

  const response = await axios.post(`/api/blog`, formData, {
    headers,
  });
  return response.data;
};

const deletePost = async (id: string) => {
  const headersList = {
    Accept: "*/*",
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

export { getPosts, getPublishedPosts, getPostById, updatePOST, deletePost };
