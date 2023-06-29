import { EventFormProps } from "@/components/Dashboard/DashboardEvent/AddEventForm";
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

const addEventPayment = async (
  eventId: string,
  userId: string,
  amount: number,
  paid: boolean,
  receipt: string
) => {
  const headers = {
    Accept: "*/*",
    "Content-Type": "application/json",
  };

  const body = JSON.stringify({
    eventId,
    amount,
    userId,
    paid,
    receipt,
  });
  const response = await axios.post(`/api/events/attend/payments`, body, {
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

export const updateEvent = async (
  id: string,
  title: string,
  details: string,
  image: string,
  location: string,
  price: string,
  organizers: string
) => {
  const headers = {
    Accept: "*/*",
    "Content-Type": "application/json",
  };

  const body = JSON.stringify({
    id,
    title,
    details,
    image,
    location,
    price,
    organizers,
  });

  const response = await axios.put(`/api/events`, body, {
    headers,
  });
  return response.data;
};

const getMyEvents = async (id: string) => {
  let headersList = {
    Accept: "*/*",
  };

  let reqOptions = {
    url: `/api/events/attend/${id}/myevents`,
    method: "GET",
    headers: headersList,
  };

  let response = await axios.request(reqOptions);
  return response.data;
};

export const createEvent = async (formData: EventFormProps) => {
  const headers = {
    Accept: "*/*",
    "Content-Type": "application/json",
  };
  const response = await axios.post(`/api/events`, formData, {
    headers,
  });
  return response.data;
};

export {
  getEvents,
  getEventById,
  addEventAttendee,
  deleteEvent,
  getMyEvents,
  addEventPayment,
};
