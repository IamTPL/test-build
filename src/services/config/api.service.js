import axios from 'axios';

const commonConfig = {
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
};

export default (baseURL) => {
    const axiosInstance = axios.create({
        baseURL,
        ...commonConfig,
    });

    return axiosInstance;
};
