import { UserUpdateFormProps } from "@/components/Dashboard/user/UserUpdateForm";
import axios from "axios";

const getUser = async (id: String) => {
  let headersList = {
    Accept: "*/*",
  };

  let reqOptions = {
    url: `/api/users/${id}`,
    method: "GET",
    headers: headersList,
  };

  let response = await axios.request(reqOptions);
  return response.data;
};

const updateUser = ({ name, phone, profession, professional_pin, email }: UserUpdateFormProps) => {

}

export {getUser}
