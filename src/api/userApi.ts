import axios from "axios";
import { UserProfile } from "../types/UserDataProfile";
import { PatchUserData } from "../types/UserUpdateData";
import apiClient from "./axiosConfig";

export const getProfile = async (): Promise<UserProfile> => {
	try {
		const response = await apiClient.get("user/me");
		return response.data;
	} catch (error) {
		if (error) {
			throw error;
		}
		throw error;
	}
};

export const updateProfile = async (
	userId: number,
	userData: PatchUserData,
): Promise<UserProfile> => {
	try {
		const response = await apiClient.patch(`user/${userId}`, userData);
		return response.data;
	} catch (error) {
		if (error) {
			throw error;
		}
		throw error;
	}
};
