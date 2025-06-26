import { useNavigate } from "react-router-dom";
import MedsList from "../components/MedsList";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { Box } from "@mui/material";
import ListTitle from "../components/ListTitle";

const Meds: React.FC = () => {
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
			<ListTitle text="Available Meds" sx={{ textAlign: "center" }} />
			<MedsList />
		</Box>
	);
};
export default Meds;
