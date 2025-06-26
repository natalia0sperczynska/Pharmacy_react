import axios from "axios";

const API_URL = "http://localhost:8080";

export const getPurchases = async (userId: number) => {
	try {
		const response = await axios.get(`${API_URL}/api/purchases`, {
			params: { userId },
			headers: {
				Authorization: `Bearer ${localStorage.getItem("authToken")}`,
			},
		});
		return response.data;
	} catch (error) {
		if (axios.isAxiosError(error)) {
			throw error.response?.data || error.message;
		} else if (error instanceof Error) {
			throw error.message;
		} else {
			throw error;
		}
	}
};
