import axios from "axios";
import CONFIG from "../config";

const defaults = {
    baseURL: CONFIG.BASE_URL,
    headers: () => ({
        "Content-Type": "application/json",
    }),
    error: {
        code: "INTERNAL_ERROR",
        message: "Something went wrong. Please check your internet connection.",
        status: 503,
        data: {},
    },
};

const api = ({ method, route, variables }) => {
    return new Promise((resolve, reject) => {
        axios({
            url: `${defaults.baseURL}${route}`,
            method,
            headers: defaults.headers(),
            params: method === "get" ? variables : undefined,
            data: method === "get" || "post" || "delete" || "put" ? variables : undefined,
        }).then(
            (response) => {
                resolve(response.data);
            },
            (error) => {
                if (error.response) {
                    reject(error.response.data);
                } else {
                    reject(defaults.error);
                }
            }
        );
    });
};

export default {
    get: (args) => api({ method: "get", ...args }),
    post: (args) => api({ method: "post", ...args }),
    put: (args) => api({ method: "put", ...args }),
    delete: (args) => api({ method: "delete", ...args }),
};
