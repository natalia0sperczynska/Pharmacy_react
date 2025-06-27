import axios from "axios";
import { LoginDTO, LoginResponseDTO } from "../types/Auth";
const API_URL = "http://localhost:8080/api/auth";

export const loginApi = async (
	loginData: LoginDTO,
): Promise<LoginResponseDTO> => {
	try {
		const response = await axios.post<LoginResponseDTO>(
			`${API_URL}/login`,
			loginData,
		);
		return response.data;
	} catch (error) {
		throw error;
	}
};
