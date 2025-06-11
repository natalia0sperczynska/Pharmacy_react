import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import ResponsiveAppBar from "../components/AppBar";
import CustomButton from "../components/Button";
import LogoutIcon from "@mui/icons-material/Logout";
import MedsList from "../components/MedsList";
import ListTitle from "../components/ListTitle";
import Footer from "../components/Footer";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

type UserData = {
	id: number;
	username: string;
};

const HomePage: React.FC = () => {
	const { userId } = useParams<{ userId: string }>();
	const [user, setUser] = useState<UserData | null>(null);
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchUserData = async () => {
			try {
				const token = localStorage.getItem("authToken");
				if (!token) {
					navigate("/login");
					return;
				}

				const response = await axios.get(`http://localhost:8080/api/user/me`, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});

				setUser(response.data);
			} catch (error) {
				console.error("Failed to fetch user data", error);
				navigate("/login");
			} finally {
				setLoading(false);
			}
		};

		fetchUserData();
	}, [userId, navigate]);

	const handleLogout = () => {
		localStorage.removeItem("authToken");
		localStorage.removeItem("userId");
		navigate("/login");
	};

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
