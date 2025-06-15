import { useState } from "react";
import CustomTextField from "./TextField";
import Stack from "@mui/material/Stack";
import CustomButton from "./Button";
import Fingerprint from "@mui/icons-material/Fingerprint";
import axios from "axios";
import { replace, useNavigate } from "react-router-dom";
import { Alert } from "@mui/material";
import { useAuth } from "../context/AuthContext";

export default function Form() {
	const { login } = useAuth();
	const navigate = useNavigate();
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault(); //zeby nie robic reloada strony
		setLoading(true);
		setError("");

		try {
			const response = await axios.post(
				"http://localhost:8080/api/auth/login",
				{ username, password },
			);
			const { token, userId, username: responseUsername } = response.data;
			login(token, userId, responseUsername);

			navigate("/home");
		} catch (error) {
			console.error("Login error:", error);
		} finally {
			setLoading(false);
		}
	};
	return (
		<form onSubmit={handleSubmit}>
			<Stack direction="column" spacing={2}>
				<CustomTextField
					label="Username"
					variant="outlined"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					required
				/>
				<CustomTextField
					label="Password"
					variant="outlined"
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					required
				/>
				{error && <Alert severity="error">{error}</Alert>}
				<CustomButton
					text={loading ? "Logging in..." : "Login"}
					icon={<Fingerprint />}
					type="submit"
				/>
			</Stack>
		</form>
	);
}
