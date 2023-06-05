import axios from "axios";

const getEvents = async () => {
  let headersList = {
    "Accept": "*/*",
  }

  let reqOptions = {
    url: `/api/events`,
    method: "GET",
    headers: headersList,
  }

  let response = await axios.request(reqOptions);
  return response.data;
};

const getEventById = async (id: string) => {
  let headersList = {
    "Accept": "*/*",
  }

  let reqOptions = {
    url: `/api/events/${id}`,
    method: "GET",
    headers: headersList,
  }

  let response = await axios.request(reqOptions);
  return response.data;
}

export { getEvents, getEventById }