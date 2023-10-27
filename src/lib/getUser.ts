import { EventFormProps } from "@/components/Dashboard/DashboardEvent/AddEventForm";
import axios from "axios";

const getUser = async () => {
  let headersList = {
    Accept: "*/*",
  };

  let reqOptions = {
    url: `/api/users/update`,
    method: "GET",
    headers: headersList,
  };

  let response = await axios.request(reqOptions);
  return response.data;
};

export {getUser}
