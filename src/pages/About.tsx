import React from "react";
import Footer from "../components/Footer";
import Logo from "../components/Logo";
import Navigation from "../components/NavigationBar";
import Box from "@mui/material/Box";
import Welcome from "../components/WelcomeDescription";
import Opinion from "../components/CustomerOpinion";

const About: React.FC = () => {
	return (
		<Box
			display="flex"
			flexDirection="column"
			minHeight="100vh"
			justifyContent="space-between"
		>
			<Box
				width="100%"
				display="flex"
				flexDirection="column"
				alignItems="center"
				flexGrow={1}
			>
				<Logo size="large" />
				<Welcome />
				<Box width="100%" maxWidth={800} px={2} mt={6} mb={6}>
					<Opinion />
				</Box>
			</Box>
			<Box width="100%">
				<Navigation />
				<Footer />
			</Box>
		</Box>
	);
};

export default About;
