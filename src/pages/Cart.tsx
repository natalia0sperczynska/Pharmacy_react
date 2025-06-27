import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { PaymentMethods } from "../types/PaymentMethods";
import { PurchaseItemDTO, CreatePurchaseDTO } from "../types/Purchase";
import { useCart } from "../context/CartContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const CartPage: React.FC = () => {
	const { user } = useAuth();
	const navigate = useNavigate();
	const { cartItems, updateQuantity, removeItem, clearCart } = useCart();

	const [paymentMethod, setPaymentMethod] = useState<PaymentMethods>(
		PaymentMethods.CREDIT_CARD,
	);
	const [isLoading, setIsLoading] = useState(false);

	const createPurchase = async (purchaseData: CreatePurchaseDTO) => {
		setIsLoading(true);
		try {
			const response = await axios.post(
				"http://localhost:8080/api/purchases",
				purchaseData,
				{
					headers: {
						Authorization: `Bearer ${user?.token}`,
						"Content-Type": "application/json",
					},
				},
			);
			return response.data;
		} finally {
			setIsLoading(false);
		}
	};

	const handleFinalizePurchase = async () => {
		if (!user || cartItems.length === 0) {
			alert("Cart is empty or user not logged in.");
			return;
		}

		const itemsForApi: PurchaseItemDTO[] = cartItems.map((item) => ({
			medId: item.id,
			quantity: item.quantity,
		}));

		const purchaseData: CreatePurchaseDTO = {
			purchaseDate: new Date().toISOString().split("T")[0],
			paymentMethod,
			userId: user.id,
			items: itemsForApi,
		};

		try {
			await createPurchase(purchaseData);
			alert("Purchase completed successfully!");
			clearCart();
			navigate("/purchase-success");
		} catch (error) {
			console.error("Error during purchase creation:", error);
			alert("An error occurred. Please try again.");
		}
	};

	const calculateTotal = () => {
		return cartItems
			.reduce((total, item) => total + item.price * item.quantity, 0)
			.toFixed(2);
	};

	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				minHeight: "100vh",
				p: 2,
				gap: 3,
			}}
		>
			<Typography variant="h4" sx={{ textAlign: "center", mb: 2 }}>
				Your Cart
			</Typography>

			{cartItems.length === 0 ? (
				<Box
					sx={{
						textAlign: "center",
						mt: 4,
					}}
				>
					<RemoveShoppingCartIcon sx={{ fontSize: 60, color: "grey.500" }} />
					<Typography variant="h6">Your cart is empty.</Typography>
				</Box>
			) : (
				<>
					{cartItems.map((item) => (
						<Box
							key={item.id}
							sx={{
								display: "flex",
								justifyContent: "space-between",
								alignItems: "center",
								border: "1px solid",
								borderColor: "divider",
								borderRadius: 2,
								p: 2,
							}}
						>
							<Box>
								<Typography variant="subtitle1" fontWeight="bold">
									{item.name}
								</Typography>
								<Typography variant="body2" color="text.secondary">
									{item.dose} • {item.company_name}
								</Typography>
							</Box>

							<Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
								<IconButton
									onClick={() => updateQuantity(item.id, item.quantity - 1)}
									disabled={item.quantity <= 1}
									color="primary"
								>
									<RemoveIcon />
								</IconButton>
								<Typography>{item.quantity}</Typography>
								<IconButton
									onClick={() => updateQuantity(item.id, item.quantity + 1)}
									color="primary"
								>
									<AddIcon />
								</IconButton>
							</Box>

							<Typography sx={{ width: 80, textAlign: "right" }}>
								${(item.price * item.quantity).toFixed(2)}
							</Typography>

							<Button
								variant="outlined"
								color="error"
								onClick={() => removeItem(item.id)}
							>
								Remove
							</Button>
						</Box>
					))}

					<Divider sx={{ my: 2 }} />

					<Box
						sx={{
							display: "flex",
							justifyContent: "space-between",
							alignItems: "center",
							flexWrap: "wrap",
							gap: 2,
						}}
					>
						<Typography variant="h6">Total: ${calculateTotal()}</Typography>
						<Select
							value={paymentMethod}
							onChange={(e) =>
								setPaymentMethod(e.target.value as PaymentMethods)
							}
							size="small"
							sx={{ minWidth: 200 }}
						>
							{Object.values(PaymentMethods).map((method) => (
								<MenuItem key={method} value={method}>
									{method
										.split("_")
										.map((w) => w[0] + w.slice(1).toLowerCase())
										.join(" ")}
								</MenuItem>
							))}
						</Select>
						<Button
							variant="contained"
							color="primary"
							onClick={handleFinalizePurchase}
							disabled={isLoading}
						>
							{isLoading ? "Processing..." : "Finalize Purchase"}
						</Button>
					</Box>
				</>
			)}
		</Box>
	);
};

export default CartPage;
