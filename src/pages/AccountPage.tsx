import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
	Box,
	Typography,
	TextField,
	Button,
	Avatar,
	Paper,
	Divider,
	CircularProgress,
	Alert,
} from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { UserProfile } from "../types/UserDataProfile";
import { getProfile, updateProfile } from "../api/userApi";
import { PatchUserData } from "../types/UserUpdateData";
import ResponsiveAppBar from "../components/AppBar";
import Footer from "../components/Footer";

const AccountPage = () => {
	const { user } = useAuth();
	const [profile, setProfile] = useState<UserProfile | null>(null);
	const [formData, setFormData] = useState<PatchUserData>({
		name: "",
		lastName: "",
		email: "",
		phoneNumber: 0,
	});
	const [loading, setLoading] = useState(true);
	const [updating, setUpdating] = useState(false);
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");
	const navigate = useNavigate();

	useEffect(() => {
		const fetchProfile = async () => {
			try {
				if (!user?.token) {
					navigate("/login");
					return;
				}

				const profileData = await getProfile(user.token);
				setProfile(profileData);
				setFormData({
					name: profileData.name,
					lastName: profileData.lastName,
					email: profileData.email,
					phoneNumber: profileData.phoneNumber,
				});
			} catch (err) {
				setError("Failed to fetch profile data");
				console.error("Profile fetch error:", err);
			} finally {
				setLoading(false);
			}
		};

		fetchProfile();
	}, [user, navigate]);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setUpdating(true);
		setError("");
		setSuccess("");

		try {
			if (!user?.token || !profile) return;

			const updatedProfile = await updateProfile(
				profile.id,
				formData,
				user.token,
			);
			setProfile(updatedProfile);
			setSuccess("Profile updated successfully");
		} catch (err) {
			setError("Failed to update profile");
			console.error("Profile update error:", err);
		} finally {
			setUpdating(false);
		}
	};

	if (loading) {
		return (
			<Box
				display="flex"
				justifyContent="center"
				alignItems="center"
				minHeight="60vh"
			>
				<CircularProgress />
			</Box>
		);
	}

	if (!profile) {
		return (
			<Box p={3}>
				<Alert severity="error">{error || "Profile not found"}</Alert>
			</Box>
		);
	}

	return (
		<Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
			<ResponsiveAppBar />
			<Box sx={{ maxWidth: 600, mx: "auto", p: 3, flexGrow: 1 }}>
				<Paper elevation={3} sx={{ p: 3 }}>
					{success && (
						<Alert severity="success" sx={{ mb: 2 }}>
							{success}
						</Alert>
					)}
					{error && (
						<Alert severity="error" sx={{ mb: 2 }}>
							{error}
						</Alert>
					)}

					<Typography
						variant="h4"
						component="h1"
						gutterBottom
						color="primary.dark"
					>
						Account Settings
					</Typography>

					<Box
						sx={{
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							mb: 3,
						}}
					>
						<Avatar
							sx={{
								width: 100,
								height: 100,
								mb: 2,
								bgcolor: "primary.main",
								fontSize: "2.5rem",
								fontWeight: "bold",
							}}
						>
							{profile.name.charAt(0)}
							{profile.lastName.charAt(0)}
						</Avatar>
					</Box>

					<Divider sx={{ my: 3 }} />

					<form onSubmit={handleSubmit}>
						<TextField
							fullWidth
							label="First name"
							name="name"
							value={formData.name}
							onChange={handleInputChange}
							margin="normal"
							required
						/>
						<TextField
							fullWidth
							label="Last name"
							name="lastName"
							value={formData.lastName}
							onChange={handleInputChange}
							margin="normal"
							required
						/>
						<TextField
							fullWidth
							label="Email"
							name="email"
							type="email"
							value={formData.email}
							onChange={handleInputChange}
							margin="normal"
							required
						/>
						<TextField
							fullWidth
							label="Phone number"
							name="phoneNumber"
							type="number"
							value={formData.phoneNumber}
							onChange={handleInputChange}
							margin="normal"
							required
						/>
						<Box
							sx={{
								display: "flex",
								justifyContent: "flex-end",
								mt: 2,
								gap: 2,
							}}
						>
							<Button
								variant="outlined"
								onClick={() => navigate("/my-profile")}
							>
								Back to profile
							</Button>
							<Button
								type="submit"
								variant="contained"
								color="primary"
								disabled={updating}
							>
								{updating ? <CircularProgress size={24} /> : "Save Changes"}
							</Button>
						</Box>
					</form>
				</Paper>
			</Box>
			<Footer />
		</Box>
	);
};

export default AccountPage;
