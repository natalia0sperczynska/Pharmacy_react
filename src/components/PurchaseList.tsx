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
	Box,
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
						<TableCell sx={{ fontWeight: "bold" }}>Purchase ID</TableCell>
						<TableCell sx={{ fontWeight: "bold" }}>Date</TableCell>
						<TableCell sx={{ fontWeight: "bold" }}>Payment Method</TableCell>
						<TableCell sx={{ fontWeight: "bold" }}>Items</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{purchases.map((purchase) => (
						<TableRow key={purchase.id}>
							{/* Kolumny z danymi ogólnymi zakupu */}
							<TableCell>{purchase.id}</TableCell>
							<TableCell>
								{new Date(purchase.purchaseDate).toLocaleDateString()}
							</TableCell>
							<TableCell>{purchase.paymentMethod}</TableCell>
							<TableCell>
								<Box>
									<Table size="small" aria-label="purchase items">
										<TableHead>
											<TableRow>
												<TableCell>Medicine</TableCell>
												<TableCell>Quantity</TableCell>
												<TableCell>Unit Price</TableCell>
												<TableCell>Total Price</TableCell>
											</TableRow>
										</TableHead>
										<TableBody>
											{purchase.items.map((item) => (
												<TableRow key={item.medId}>
													<TableCell>{item.medName}</TableCell>
													<TableCell>{item.quantity}</TableCell>
													<TableCell>${item.unitPrice.toFixed(2)}</TableCell>
													<TableCell>${item.totalPrice.toFixed(2)}</TableCell>
												</TableRow>
											))}
										</TableBody>
									</Table>
								</Box>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
};

export default PurchaseList;
