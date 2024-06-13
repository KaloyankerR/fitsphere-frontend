import axiosInstance from "./axiosConfig";

export const postWorkout = async (values, accessToken) => {
  await axiosInstance.post("/workouts", values, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
};

export const postUser = async (values) => {
    await axiosInstance.post("/users", values);
};

export const postRating = async (values, accessToken) => {
    await axiosInstance.post("/ratings", values, {
        headers: { Authorization: `Bearer ${accessToken}` },
    });
};

export const postAppointment = async (values, accessToken) => {
  await axiosInstance.post("/appointments", values, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
};