import axios from "axios";
import { User } from "../types/User";

const apiClient = axios.create({
	baseURL: "http://localhost:8080/api",
	headers: {
		"Content-Type": "application/json",
	},
});

apiClient.interceptors.request.use(
	(config) => {
		const userString = localStorage.getItem("user");
		if (userString) {
			const user: User = JSON.parse(userString);

			if (user && user.token) {
				config.headers.Authorization = `Bearer ${user.token}`;
			}
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	},
);

export default apiClient;
