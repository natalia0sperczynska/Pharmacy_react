import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import ResponsiveAppBar from "../components/AppBar";
import CustomButton from "../components/Button";
import LogoutIcon from "@mui/icons-material/Logout";
import ListTitle from "../components/ListTitle";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import PurchaseList from "../components/PurchaseList";
import { getPurchases } from "../api/purchases";
import { Purchase } from "../types/Purchase";
import { Typography } from "@mui/material";

const PurchasePage: React.FC = () => {
	const { user, logout } = useAuth();
	const navigate = useNavigate();
	const [purchases, setPurchases] = useState<Purchase[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (!user) {
			navigate("/login");
		}
	}, [user, navigate]);

	useEffect(() => {
		const fetchPurchases = async () => {
			if (user) {
				try {
					const data = await getPurchases(user.id);
					setPurchases(data);
				} catch (error) {
					console.error("Error fetching purchases:", error);
				} finally {
					setLoading(false);
				}
			}
		};

		fetchPurchases();
	}, [user]);

	if (loading) {
		return <Box>Loading...</Box>;
	}

	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				minHeight: "100vh",
			}}
		>
			<ResponsiveAppBar />
			<Box
				component="main"
				sx={{
					flexGrow: 1,
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					justifyContent: "center",
					p: 3,
					width: "100%",
				}}
			>
				<Box sx={{ width: "100%", maxWidth: "1200px", mb: 2 }}>
					<Typography variant="h6" component="h1" color="primary.dark">
						Purchase history for <strong>{user?.username}</strong>
					</Typography>
				</Box>
				<Box
					sx={{
						width: "100%",
						maxWidth: "1200px",
						display: "flex",
						flexDirection: "column",
						gap: 4,
					}}
				>
					<Box
						sx={{ flex: 2, display: "flex", flexDirection: "column", gap: 2 }}
					>
						<ListTitle text="Your Purchases" />
						{loading ? (
							<Box>Loading purchases...</Box>
						) : (
							<PurchaseList purchases={purchases} />
						)}
					</Box>
				</Box>
			</Box>
			<Box
				sx={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
					p: 2,
					borderTop: "1px solid",
					borderColor: "divider",
				}}
			>
				<Footer />
				<CustomButton
					text="Logout"
					icon={<LogoutIcon />}
					size="medium"
					onClick={() => {
						logout();
						navigate("/login");
					}}
				/>
			</Box>
		</Box>
	);
};

export default PurchasePage;
