import React from "react";
import { Box, Typography } from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import ResponsiveAppBar from "../../components/AppBar";
import Footer from "../../components/Footer";
import CustomButton from "../../components/Button";
import LogoutIcon from "@mui/icons-material/Logout";

const Main = () => {
	const { user, logout } = useAuth();
	const navigate = useNavigate();

	if (!user) {
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
						Welcome, administrator. Here you can manage the application.
					</Typography>
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

export default Main;
