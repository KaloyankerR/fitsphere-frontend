import axiosInstance from "./axiosConfig";

export const putUser = async (values, accessToken) => {
  await axiosInstance.put("/users", values, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
};
