import axios from "axios";

const getPayments = async () => {
  let headersList = {
    Accept: "*/*",
  };

  let reqOptions = {
    url: `/api/payments`,
    method: "GET",
    headers: headersList,
  };

  let response = await axios.request(reqOptions);
  return response.data;
};

const getAttendees = async () => {
  let headersList = {
    Accept: "*/*",
  };

  let reqOptions = {
    url: `/api/attendees`,
    method: "GET",
    headers: headersList,
  };

  let response = await axios.request(reqOptions);
  return response.data;
};

export { getPayments, getAttendees };
