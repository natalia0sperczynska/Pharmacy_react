import React from "react";
import { Box } from "@mui/material";
import ResponsiveAppBar from "../../components/AppBar";
import CustomButton from "../../components/Button";
import Footer from "../../components/Footer";
import LogoutIcon from "@mui/icons-material/Logout";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import AllPurchases from "../../components/AllPurchases";

const AllOrdersPage: React.FC = () => {
	const { logout } = useAuth();
	const navigate = useNavigate();

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
					justifyContent: "center",
					py: 4,
					px: 2,
				}}
			>
				<AllPurchases />
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

export default AllOrdersPage;
