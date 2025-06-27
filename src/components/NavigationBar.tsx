import * as React from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import HomeIcon from "@mui/icons-material/Home";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import LockIcon from "@mui/icons-material/Lock";
import { Link, useLocation } from "react-router-dom";

export default function Navigation() {
	const location = useLocation();

	const routes = ["/register", "/", "/login"];
	const currentIndex = routes.indexOf(location.pathname);

	return (
		<Box
			sx={{
				width: "100%",
				position: "fixed",
				bottom: 0,
				left: 0,
				right: 0,
				zIndex: 1000,
			}}
		>
			<BottomNavigation
				showLabels
				value={currentIndex !== -1 ? currentIndex : false}
				sx={{
					"& .MuiBottomNavigationAction-root": {
						color: "primary.dark",
						"&.Mui-selected": {
							color: "primary.main",
						},
					},
				}}
			>
				<BottomNavigationAction
					label="Register"
					icon={<HowToRegIcon />}
					component={Link}
					to="/register"
				/>
				<BottomNavigationAction
					label="Home"
					icon={<HomeIcon />}
					component={Link}
					to="/"
				/>
				<BottomNavigationAction
					label="Login"
					icon={<LockIcon />}
					component={Link}
					to="/login"
				/>
			</BottomNavigation>
		</Box>
	);
}
