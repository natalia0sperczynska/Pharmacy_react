import { UserProfile } from "./UserDataProfile";

export interface PurchaseItem {
	medId: number;
	medName: string;
	quantity: number;
	unitPrice: number;
	totalPrice: number;
}

export interface Purchase {
	id: number;
	purchaseDate: string;
	paymentMethod: string;
	user: UserProfile;
	items: PurchaseItem[];
}
export interface PurchaseItemDTO {
	medId: number;
	quantity: number;
}

export interface CreatePurchaseDTO {
	purchaseDate: string;
	paymentMethod: string;
	userId: number;
	items: PurchaseItemDTO[];
}
