import axiosInstance from './axiosConfig';

export const fetchAppointmentsByUserId = async (id, accessToken) => {
    const response = await axiosInstance.get(`/appointments/${id}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
    });
    if (response.data) {
        return response.data;
    } else {
        throw new Error('Invalid data format');
    }
};

export const fetchAllAppointments = async (accessToken) => {
    const response = await axiosInstance.get(`/appointments`, {
        headers: { Authorization: `Bearer ${accessToken}` },
    });
    if (response.data) {
        return response.data;
    } else {
        throw new Error('Invalid data format');
    }
};

export const fetchUserById = async (id, accessToken) => {
    const response = await axiosInstance.get(`/users/${id}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
    });
    if (response.data) {
        return response.data;
    } else {
        throw new Error('Invalid data format');
    }
};

export const fetchUsersByRole = async (role, accessToken) => {
    const response = await axiosInstance.get(`/users/role/${role}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
    });
    if (response.data) {
        return response.data;
    } else {
        throw new Error('Invalid data format');
    }
};

export const fetchTrainersRequest = async () => {
    const response = await axiosInstance.get(`/users/role/trainer`);
    if (response.data) {
        return response.data;
    } else {
        throw new Error('Invalid data format');
    }
};

export const fetchWorkoutsRequest = async () => {
    const response = await axiosInstance.get(`/workouts`);
    if (response.data) {
        return response.data;
    } else {
        throw new Error('Invalid data format');
    }
};
