import axios from "axios";
import { UserProfile } from "../types/UserDataProfile";
import { PatchUserData } from "../types/UserUpdateData";

const API_URL = "http://localhost:8080";

export const getProfile = async (token: string): Promise<UserProfile> => {
	try {
		const response = await axios.get(`${API_URL}/api/user/me`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return response.data;
	} catch (error) {
		if (axios.isAxiosError(error)) {
			throw error.response?.data || error.message;
		}
		throw error;
	}
};

export const updateProfile = async (
	userId: number,
	userData: PatchUserData,
	token: string,
): Promise<UserProfile> => {
	try {
		const response = await axios.patch(
			`${API_URL}/api/user/${userId}`,
			userData,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			},
		);
		return response.data;
	} catch (error) {
		if (axios.isAxiosError(error)) {
			throw error.response?.data || error.message;
		}
		throw error;
	}
};
