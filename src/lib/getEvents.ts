import axios from "axios";

const getEvents = async () => {
  let headersList = {
    Accept: "*/*",
  };

  let reqOptions = {
    url: `/api/events`,
    method: "GET",
    headers: headersList,
  };

  let response = await axios.request(reqOptions);
  return response.data;
};

const getEventById = async (id: string) => {
  let headersList = {
    Accept: "*/*",
  };

  let reqOptions = {
    url: `/api/events/${id}`,
    method: "GET",
    headers: headersList,
  };

  let response = await axios.request(reqOptions);
  return response.data;
};

const addEventAttendee = async (eventId: string) => {
  const headers = {
    Accept: "*/*",
    "Content-Type": "application/json",
  };

  const body = JSON.stringify({
    eventId,
  });
  const response = await axios.post(`/api/events/attend`, body, {
    headers,
  });
  return response.data;
};

const deleteEvent = async (id: string) => {
  const headersList = {
    Accept: "*/*",
  };

  const reqOptions = {
    url: `/api/events?id=${id}`,
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

const getEventAttendees = async (id: string) => {
  let headersList = {
    Accept: "*/*",
  };

  let reqOptions = {
    url: `/api/events/attend/${id}`,
    method: "GET",
    headers: headersList,
  };

  let response = await axios.request(reqOptions);
  return response.data;
};

export { getEvents, getEventById, addEventAttendee, deleteEvent };
