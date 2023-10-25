import axios from "axios";

const resetUserPassword = async (
  token: string,
  password: string,
  verifyPassword: string
) => {
  const headers = {
    Accept: "*/*",
    "Content-Type": "application/json",
  };

  const data = {
    token,
    password,
    verifyPassword,
  };
  const response = await axios.put(`/api/recover_email_password/`, data, {
    headers,
  });
  return response;
};

export { resetUserPassword };
