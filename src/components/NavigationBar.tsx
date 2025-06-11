import * as React from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import HomeIcon from "@mui/icons-material/Home";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import LockIcon from "@mui/icons-material/Lock";
import { Link } from "react-router-dom";

export default function Navigation() {
	const [value, setValue] = React.useState(0);

	return (
		<Box
			sx={{ width: "100%", position: "fixed", bottom: 0, left: 0, right: 0 }}
		>
			<BottomNavigation
				showLabels
				value={value}
				onChange={(event, newValue) => {
					setValue(newValue);
				}}
			>
				<BottomNavigationAction label="Register" icon={<HowToRegIcon />} />
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
