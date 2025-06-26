export interface Purchase {
	id: number;
	purchaseDate: string;
	paymentMethod: string;
	med: {
		id: number;
		name: string;
		price: number;
		quantity: number;
	};
}
