import { Purchase, PurchaseItemDTO } from "../types/Purchase";
import apiClient from "./axiosConfig";

interface CreatePurchaseData {
	purchaseDate: string;
	paymentMethod: string;
	userId: number;
	items: PurchaseItemDTO[];
}

export const createPurchase = async (
	purchaseData: CreatePurchaseData,
): Promise<any> => {
	try {
		const response = await apiClient.post("/purchases", purchaseData);
		return response.data;
	} catch (error) {
		if (error) {
			throw error;
		}
		throw error;
	}
};

export const getPurchases = async (userId: number): Promise<Purchase[]> => {
	try {
		const response = await apiClient.get("/purchases", {
			params: { userId },
		});
		return response.data;
	} catch (error) {
		if (error) {
			throw error;
		}
		throw error;
	}
};
