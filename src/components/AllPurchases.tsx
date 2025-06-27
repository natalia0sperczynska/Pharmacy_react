import React, { useEffect, useState } from "react";
import {
	Box,
	CircularProgress,
	Alert,
	Typography,
	Divider,
} from "@mui/material";
import { Purchase } from "../types/Purchase";
import { getAllPurchasesAsAdmin } from "../api/admin";
import PurchaseList from "./PurchaseList";

const AllPurchases: React.FC = () => {
	const [purchases, setPurchases] = useState<Purchase[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading(true);
				setError(null);
				const [purchasesData] = await Promise.all([getAllPurchasesAsAdmin()]);
				setPurchases(purchasesData);
			} catch (error) {
				setError("Failed to fetch purchases.");
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	if (loading) {
		return (
			<Box display="flex" justifyContent="center" sx={{ mt: 4 }}>
				<CircularProgress />
			</Box>
		);
	}

	if (error) {
		return <Alert severity="error">{error}</Alert>;
	}

	return (
		<Box sx={{ width: "100%", maxWidth: "1200px", mx: "auto" }}>
			<Typography variant="h4" component="h2" color="primary" sx={{ mb: 2 }}>
				All Purchases
			</Typography>
			<Divider sx={{ mb: 2 }} />
			<PurchaseList purchases={purchases} />
		</Box>
	);
};

export default AllPurchases;
