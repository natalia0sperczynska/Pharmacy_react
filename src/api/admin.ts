import { Purchase } from "../types/Purchase";
import { UserProfile } from "../types/UserDataProfile";
import apiClient from "./axiosConfig";

export const getAllPurchasesAsAdmin = async (): Promise<Purchase[]> => {
	try {
		const response = await apiClient.get("/purchases");
		return response.data;
	} catch (error) {
		console.error("Failed to fetch all purchases", error);
		throw error;
	}
};

export const getAllUsersAsAdmin = async (): Promise<UserProfile[]> => {
	try {
		const response = await apiClient.get("/user/all");
		return response.data;
	} catch (error) {
		console.error("Failed to fetch all users", error);
		throw error;
	}
};
