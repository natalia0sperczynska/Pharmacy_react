import React, {
	createContext,
	useState,
	useContext,
	ReactNode,
	useEffect,
} from "react";
import { Med } from "../types/Med";
interface CartContextType {
	cartItems: Med[];
	addToCart: (med: Med) => void;
	updateQuantity: (id: number, newQuantity: number) => void;
	removeItem: (id: number) => void;
	clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
	const [cartItems, setCartItems] = useState<Med[]>(() => {
		try {
			const savedCart = window.localStorage.getItem("cartItems");
			return savedCart ? JSON.parse(savedCart) : [];
		} catch (error) {
			console.error("Failed to parse cart from localStorage", error);
			return [];
		}
	});

	useEffect(() => {
		window.localStorage.setItem("cartItems", JSON.stringify(cartItems));
	}, [cartItems]);

	const addToCart = (medToAdd: Med) => {
		setCartItems((prevItems) => {
			const isItemInCart = prevItems.find((item) => item.id === medToAdd.id);
			if (isItemInCart) {
				return prevItems.map((item) =>
					item.id === medToAdd.id
						? { ...item, quantity: item.quantity + 1 }
						: item,
				);
			}
			return [...prevItems, { ...medToAdd, quantity: 1 }];
		});
	};

	const updateQuantity = (id: number, newQuantity: number) => {
		if (newQuantity < 1) {
			removeItem(id);
			return;
		}
		setCartItems(
			cartItems.map((item) =>
				item.id === id ? { ...item, quantity: newQuantity } : item,
			),
		);
	};

	const removeItem = (id: number) => {
		setCartItems(cartItems.filter((item) => item.id !== id));
	};

	const clearCart = () => {
		setCartItems([]);
		window.localStorage.removeItem("cartItems");
	};

	const value = { cartItems, addToCart, updateQuantity, removeItem, clearCart };

	return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
export const useCart = () => {
	const context = useContext(CartContext);
	if (context === undefined) {
		throw new Error("useCart must be used within a CartProvider");
	}
	return context;
};
