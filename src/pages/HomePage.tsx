import Box from "@mui/material/Box";
import ResponsiveAppBar from "../components/AppBar";
import CustomButton from "../components/Button";
import LogoutIcon from "@mui/icons-material/Logout";
import MedsList from "../components/MedsList";
import ListTitle from "../components/ListTitle";
import Footer from "../components/Footer";
import { useParams } from "react-router-dom";

const HomePage: React.FC = () => {
	const { userId } = useParams<{ userId: string }>();
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
					{userId ? (
						<p>
							Viewing profile for User ID: <strong>{userId}</strong>
						</p>
					) : (
						<p>No user ID provided.</p>
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
				<CustomButton text="Logout" icon={<LogoutIcon />} size="medium" />
			</Box>
		</Box>
	);
};
export default HomePage;
