import axios from "axios";


const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
});


// request Interceptors
axiosClient.interceptors.request.use((config) => {
    const token = localStorage.getItem("ACCESS_TOKEN");
    config.headers.Authorization = `Bearer ${token}`
    return config;
});

//  response Interceptors
axiosClient.interceptors.response.use((response) => {
    // resolved
    return response;
}, (error) => {
    const { response } = error;
    if (response.statu == 401) {
        localStorage.removeItem("ACCESS_TOKEN");
    }
    throw error;
})

export default axiosClient;