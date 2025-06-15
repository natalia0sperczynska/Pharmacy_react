import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import ResponsiveAppBar from "../components/AppBar";
import CustomButton from "../components/Button";
import LogoutIcon from "@mui/icons-material/Logout";
import MedsList from "../components/MedsList";
import ListTitle from "../components/ListTitle";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

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
	// try {
	// 	const token = localStorage.getItem("authToken");
	// 	if (!token) {
	// 		navigate("/login");
	// 		return;
	// 	}
	// }

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
					p: 3,
					width: "100%",
				}}
			>
				<Box
					sx={{
						width: "100%",
						maxWidth: "800px",
						display: "flex",
						flexDirection: "column",
						gap: 2,
					}}
				>
					<ListTitle />
					<MedsList />
					<h2>User Profile</h2>
					{user ? (
						<p>
							Welcome, <strong>{user.username}</strong>
						</p>
					) : (
						<p>No user data</p>
					)}
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
