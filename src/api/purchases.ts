import axios from "axios";
import { PaymentMethods } from "../types/PaymentMethods";
import { PurchaseItemDTO } from "../types/Purchase";

const API_URL = "http://localhost:8080";
export const createPurchase = async (purchaseData: {
	purchaseDate: string;
	paymentMethod: string;
	userId: number;
	items: PurchaseItemDTO[];
}) => {
	const token = localStorage.getItem("authToken");
	try {
		const response = await axios.post(
			`http://localhost:8080/api/purchases`,
			purchaseData,
			{
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-Type": "application/json",
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
