import React from "react";
import { Purchase } from "../types/Purchase";
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	Typography,
} from "@mui/material";

interface PurchaseListProps {
	purchases: Purchase[];
}

const PurchaseList: React.FC<PurchaseListProps> = ({ purchases }) => {
	if (purchases.length === 0) {
		return (
			<Typography variant="body1" sx={{ mt: 2 }}>
				No purchases found.
			</Typography>
		);
	}

	return (
		<TableContainer component={Paper} sx={{ mt: 2 }}>
			<Table>
				<TableHead>
					<TableRow>
						<TableCell>Date</TableCell>
						<TableCell>Medicine</TableCell>
						<TableCell>Price</TableCell>
						<TableCell>Quantity</TableCell>
						<TableCell>Payment Method</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{purchases.map((purchase) => (
						<TableRow key={purchase.id}>
							<TableCell>
								{new Date(purchase.purchaseDate).toLocaleDateString()}
							</TableCell>
							<TableCell>{purchase.med.name}</TableCell>
							<TableCell>${purchase.med.price.toFixed(2)}</TableCell>
							<TableCell>{purchase.med.quantity}</TableCell>
							<TableCell>{purchase.paymentMethod}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
};

export default PurchaseList;
