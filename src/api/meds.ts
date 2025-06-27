import axios from "axios";
import { Med } from "../types/Med";
import apiClient from "./axiosConfig";

export const getMeds = async (): Promise<Med[]> => {
	try {
		const response = await apiClient.get<Med[]>("/meds");
		return response.data;
	} catch (error) {
		console.error("Error fetching meds:", error);
		throw error;
	}
};
