import axios from "axios";
import { RegisterRequestDTO, RegisterResponseDTO } from "../types/Register";

const API_URL = "http://localhost:8080/api/auth";

export const registerUser = async (
	userData: RegisterRequestDTO,
): Promise<RegisterResponseDTO> => {
	try {
		const response = await axios.post<RegisterResponseDTO>(
			`${API_URL}/register`,
			userData,
		);
		return response.data;
	} catch (error) {
		if (axios.isAxiosError(error) && error.response) {
			throw new Error(error.response.data.message || "Registration failed");
		}
		throw new Error("An unexpected error occurred during registration.");
	}
};
