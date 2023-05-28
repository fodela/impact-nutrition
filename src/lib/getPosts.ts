import axios from "axios";

const getPosts = async () => {
  let headersList = {
    "Accept": "*/*",
  }

  let reqOptions = {
    url: `${process.env.LOCALURL ? process.env.LOCALURL : "http://localhost:3000"}/api/blog`,
    method: "GET",
    headers: headersList,
  }

  let response = await axios.request(reqOptions);
  return response.data;
};

const getPublishedPosts = async () => {
  let headersList = {
    "Accept": "*/*",
  }

  let reqOptions = {
    url: `${process.env.LOCALURL ? process.env.LOCALURL : "http://localhost:3000"}/api/blog/published`,
    method: "GET",
    headers: headersList,
  }

  let response = await axios.request(reqOptions);
  return response.data;
};

const getPostById = async (id: string) => {
  let headersList = {
    "Accept": "*/*",
  }

  let reqOptions = {
    url: `${process.env.LOCALURL ? process.env.LOCALURL : "http://localhost:3000"}/api/blog/${id}`,
    method: "GET",
    headers: headersList,
  }

  let response = await axios.request(reqOptions);
  return response.data;
}

export { getPosts, getPublishedPosts, getPostById }