import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import ResponsiveAppBar from "../components/AppBar";
import CustomButton from "../components/Button";
import LogoutIcon from "@mui/icons-material/Logout";
import ListTitle from "../components/ListTitle";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import HealthTips from "../components/HealthTips";
import { Typography } from "@mui/material";
import MedsListMain from "../components/MedsListMain";

const HomePage: React.FC = () => {
	const { user } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		if (!user) {
			navigate("/login");
		}
	}, [user, navigate]);

	if (!user) {
		return <Box>Loading...</Box>;
	}

	const handleLogout = () => {
		localStorage.removeItem("user");
		navigate("/login");
	};

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
					width: "100%",
					py: 4,
				}}
			>
				<Box
					sx={{ width: "100%", maxWidth: "1200px", mb: 4, textAlign: "center" }}
				>
					<Typography variant="h4" component="h2" color="primary.dark">
						Welcome, <strong>{user.username}</strong>
					</Typography>
				</Box>
				<Box
					sx={{
						width: "100%",
						maxWidth: "1200px",
						display: "flex",
						flexDirection: { xs: "column", md: "row" },
						justifyContent: "center",
						alignItems: "center",
						gap: 4,
					}}
				>
					<Box
						sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}
					>
						<Box
							sx={{
								flex: { xs: 1, md: 2 },
								width: "100%",
								maxWidth: "800px",
								display: "flex",
								flexDirection: "column",
								gap: 2,
							}}
						>
							<ListTitle text="Available Meds" sx={{ textAlign: "center" }} />
							<MedsListMain />
						</Box>
					</Box>
					<Box
						sx={{
							flex: 1,
						}}
					>
						<HealthTips />
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
					onClick={handleLogout}
				/>
			</Box>
		</Box>
	);
};

export default HomePage;
