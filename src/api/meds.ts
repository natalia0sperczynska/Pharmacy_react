import axios from "axios";
const API_URL = "http://localhost:8080";

export const getMeds = async () => {
	const token = localStorage.getItem("authToken");
	try {
		const response = await axios.get(`${API_URL}/api/meds`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return response.data;
	} catch (error) {
		console.error("Error fetching medications:", error);
		throw error;
	}
};
