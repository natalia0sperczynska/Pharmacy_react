import React, { useState } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { registerUser } from "../api/register";
import {
	Container,
	TextField,
	Button,
	Typography,
	Box,
	Alert,
	Link,
	CircularProgress,
} from "@mui/material";
import Footer from "../components/Footer";
import Navigation from "../components/NavigationBar";

const RegisterPage = () => {
	const navigate = useNavigate();

	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const [error, setError] = useState<string | null>(null);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setError(null);
		setIsSubmitting(true);
		setError(null);

		try {
			await registerUser({ email, username, password, role: "ROLE_USER" });

			navigate("/login");
		} catch (err: any) {
			if (err.response && err.response.data && err.response.data.message) {
				setError(err.message.response.data.message);
			} else {
				setError("Registration failed. Please try again.");
			}
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<Container component="main" maxWidth="xs">
			<Box
				sx={{
					marginTop: 8,
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
				}}
			>
				<Typography component="h1" variant="h5">
					Sign Up
				</Typography>
				<Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
					<TextField
						margin="normal"
						required
						fullWidth
						id="email"
						label="Email Address"
						name="email"
						autoComplete="email"
						autoFocus
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<TextField
						margin="normal"
						required
						fullWidth
						id="username"
						label="Username"
						name="username"
						autoComplete="username"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
					/>
					<TextField
						margin="normal"
						required
						fullWidth
						name="password"
						label="Password"
						type="password"
						id="password"
						autoComplete="new-password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					{error && (
						<Alert severity="error" sx={{ mt: 2 }}>
							{error}
						</Alert>
					)}
					<Button
						type="submit"
						fullWidth
						variant="contained"
						sx={{ mt: 3, mb: 2 }}
						disabled={isSubmitting}
					>
						{isSubmitting ? <CircularProgress size={24} /> : "Sign Up"}
					</Button>
					<Box textAlign="center">
						<Link component={RouterLink} to="/login" variant="body2">
							{"Already have an account? Sign In"}
						</Link>
					</Box>
					<Box width="100%">
						<Navigation />
						<Footer />
					</Box>
				</Box>
			</Box>
		</Container>
	);
};

export default RegisterPage;
