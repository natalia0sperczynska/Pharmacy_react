import { useState } from "react";
import CustomTextField from "./TextField";
import Stack from "@mui/material/Stack";
import CustomButton from "./Button";
import Fingerprint from "@mui/icons-material/Fingerprint";
import { useNavigate } from "react-router-dom";
import { Alert } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { LoginDTO } from "../types/Auth";
import { loginApi } from "../api/auth";

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
			const loginData: LoginDTO = { username, password };
			const responseData = await loginApi(loginData);
			login(responseData);
			if (responseData.role.includes("ROLE_ADMIN")) {
				navigate("/admin/main");
			} else {
				navigate("/home");
			}
		} catch (error: any) {
			console.error("Login error:", error);
			if (error.response && error.response.status === 401) {
				setError("Invalid username or password");
			} else {
				setError("Login failed. Please try again later.");
			}
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
					disabled={loading}
				/>
			</Stack>
		</form>
	);
}
