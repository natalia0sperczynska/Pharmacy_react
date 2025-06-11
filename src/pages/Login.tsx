import React from "react";
import Logo from "../components/Logo";
import Form from "../components/Form";

import Navigation from "../components/NavigationBar";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Footer from "../components/Footer";
import Header from "../components/Header";

const Login: React.FC = () => {
	return (
		<Box
			display="flex"
			flexDirection="column"
			minHeight="100vh"
			justifyContent="space-between"
			pb={7}
		>
			<Box display="flex" flexDirection="column" alignItems="center" pt={2}>
				<Logo size="large" />
				<Header />
			</Box>

			<Box
				display="flex"
				justifyContent="center"
				alignItems="center"
				flexGrow={1}
				px={2}
			>
				<Box width="100%" maxWidth={350}>
					<Form />
				</Box>
			</Box>
			<Box sx={{ pb: 7 }}>
				<Footer />
			</Box>

			<Navigation />
		</Box>
	);
};
export default Login;
