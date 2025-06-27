import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
	Box,
	Typography,
	Avatar,
	Paper,
	Divider,
	Alert,
	Button,
	CircularProgress,
} from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { UserProfile } from "../types/UserDataProfile";
import { getProfile } from "../api/userApi";
import ResponsiveAppBar from "../components/AppBar";
import LogoutIcon from "@mui/icons-material/Logout";
import Footer from "../components/Footer";

const ProfilePage = () => {
	const { user, logout } = useAuth();
	const [profile, setProfile] = useState<UserProfile | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const navigate = useNavigate();

	useEffect(() => {
		const fetchProfile = async () => {
			try {
				if (!user?.token) {
					navigate("/login");
					return;
				}

				const profileData = await getProfile();
				setProfile(profileData);
			} catch (err) {
				setError("Failed to fetch profile data");
				console.error("Profile fetch error:", err);
			} finally {
				setLoading(false);
			}
		};

		fetchProfile();
	}, [user, navigate]);

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
							{profile.name.charAt(0) ?? ""}
							{profile.lastName.charAt(0) ?? ""}
						</Avatar>
						<Typography variant="h4" component="h1" color="primary.dark">
							{profile.name ?? "Not given"} {profile.lastName ?? "Not given"}
						</Typography>
					</Box>

					<Divider sx={{ my: 3 }} />

					<Box sx={{ mb: 3 }}>
						<Typography variant="h6">Personal Information</Typography>
						<Typography>
							<strong>First name:</strong> {profile.name ?? "Not given"}
						</Typography>
						<Typography>
							<strong>Last name:</strong> {profile.lastName ?? "Not given"}
						</Typography>
						<Typography>
							<strong>Email:</strong> {profile.email}
						</Typography>
						<Typography>
							<strong>Phone number:</strong> {profile.phoneNumber ?? 0}
						</Typography>
					</Box>

					<Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
						<Button variant="contained" onClick={() => navigate("/account")}>
							Edit Account
						</Button>
						<Button
							variant="contained"
							color="primary"
							startIcon={<LogoutIcon />}
							onClick={() => {
								logout();
								navigate("/login");
							}}
						>
							Logout
						</Button>
					</Box>
				</Paper>
			</Box>
			<Footer />
		</Box>
	);
};

export default ProfilePage;
