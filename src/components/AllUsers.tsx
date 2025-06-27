import React, { useEffect, useState } from "react";
import {
	Alert,
	Box,
	CircularProgress,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
	Divider,
} from "@mui/material";
import { getAllUsersAsAdmin } from "../api/admin";
import { UserProfile } from "../types/UserDataProfile";

const AllUsers: React.FC = () => {
	const [users, setUsers] = useState<UserProfile[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading(true);
				setError(null);
				const [usersData] = await Promise.all([getAllUsersAsAdmin()]);
				setUsers(usersData);
			} catch (error) {
				setError("Failed to fetch users.");
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	if (loading) {
		return (
			<Box display="flex" justifyContent="center" sx={{ mt: 4 }}>
				<CircularProgress />
			</Box>
		);
	}

	if (error) {
		return <Alert severity="error">{error}</Alert>;
	}

	return (
		<Box sx={{ width: "100%", maxWidth: "1200px", mx: "auto" }}>
			<Typography variant="h4" component="h2" color="primary" sx={{ mb: 2 }}>
				All Users
			</Typography>
			<Divider sx={{ mb: 2 }} />
			<TableContainer component={Paper}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>ID</TableCell>
							<TableCell>First Name</TableCell>
							<TableCell>Last Name</TableCell>
							<TableCell>Email</TableCell>
							<TableCell>Phone Number</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{users.map((user) => (
							<TableRow key={user.id}>
								<TableCell>{user.id}</TableCell>
								<TableCell>{user.name}</TableCell>
								<TableCell>{user.lastName}</TableCell>
								<TableCell>{user.email}</TableCell>
								<TableCell>{user.phoneNumber}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</Box>
	);
};

export default AllUsers;
