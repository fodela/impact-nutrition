import axios from "axios";

const getPosts = async () => {
  let headersList = {
    "Accept": "*/*",
  }

  let reqOptions = {
    url: "http://localhost:3000/api/blog",
    method: "GET",
    headers: headersList,
  }

  let response = await axios.request(reqOptions);
  return response.data;
};

export { getPosts }