import axios from "axios";
import {useAuthStore} from "@/stores/auth";
import auth from "@/services/ptech/auth";
import flight from "@/services/ptech/flight";
import gallery from "@/services/ptech/gallery";

const http = axios.create({
    baseURL: import.meta.env.VITE_PTECH_BASE_URL,
    headers: {
        "Content-Type": "application/json"
    }
});

http.interceptors.request.use((config) => {

    // Check and add token
    const token = useAuthStore().getTokenString();
    if (!!token) {
        config.headers["Authorization"] = token;
    }

    return config;
}, (err) => {
    return Promise.reject(err);
});

export const usePTechAuth = () => auth(http);
export const usePTechFlight = () => flight(http);
export const useGallery = () => gallery(http);