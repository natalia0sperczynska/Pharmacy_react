import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Logo from "./Logo";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const userPages = ["Meds", "Purchase", "Purchase History"];
const settings = ["Profile", "Account", "Logout"];
const adminPages = ["Meds", "Manage Users", "All Orders"];

function ResponsiveAppBar() {
	const navigate = useNavigate();
	const { user, logout } = useAuth();
	const isAdmin = user?.role.includes("ROLE_ADMIN");

	const pagesToDisplay = isAdmin ? adminPages : userPages;

	const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
		null,
	);
	const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
		null,
	);

	const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElNav(event.currentTarget);
	};
	const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	const handleLogoClick = () => {
		navigate(isAdmin ? "/admin/main" : "/home");
	};

	const handleNavMenuClick = (page: string) => {
		handleCloseNavMenu();
		if (isAdmin) {
			switch (page) {
				case "Meds":
					navigate("/admin/meds");
					break;
				case "Manage Users":
					navigate("/admin/users");
					break;
				case "All Orders":
					navigate("/admin/all-purchases");
					break;
				default:
					navigate("/admin/main");
					break;
			}
		} else {
			switch (page) {
				case "Meds":
					navigate("/shop");
					break;
				case "Purchase":
					navigate("/purchase");
					break;
				case "Purchase History":
					navigate("/purchase-history");
					break;
				default:
					navigate("/home");
					break;
			}
		}
	};

	const handleUserMenuClick = (setting: string) => {
		handleCloseUserMenu();
		switch (setting) {
			case "Profile":
				navigate("/my-profile");
				break;
			case "Account":
				navigate("/account");
				break;
			case "Logout":
				logout();
				navigate("/login");
				break;
			default:
				break;
		}
	};

	return (
		<AppBar position="static">
			<Container maxWidth="xl">
				<Toolbar disableGutters sx={{ minHeight: "48px" }}>
					<Logo sx={{ mr: 1 }} />
					<Typography
						variant="h6"
						noWrap
						onClick={handleLogoClick}
						sx={{
							mr: 2,
							display: { xs: "none", md: "flex" },
							fontFamily: "monospace",
							fontWeight: 700,
							letterSpacing: ".3rem",
							color: "inherit",
							textDecoration: "none",
							cursor: "pointer",
						}}
					>
						PHARMACY
					</Typography>
					<Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
						<IconButton
							size="large"
							aria-label="account of current user"
							aria-controls="menu-appbar"
							aria-haspopup="true"
							onClick={handleOpenNavMenu}
							color="inherit"
						>
							<MenuIcon />
						</IconButton>
						<Menu
							id="menu-appbar"
							anchorEl={anchorElNav}
							anchorOrigin={{
								vertical: "bottom",
								horizontal: "left",
							}}
							keepMounted
							transformOrigin={{
								vertical: "top",
								horizontal: "left",
							}}
							open={Boolean(anchorElNav)}
							onClose={handleCloseNavMenu}
							sx={{ display: { xs: "block", md: "none" } }}
						>
							{pagesToDisplay.map((page) => (
								<MenuItem key={page} onClick={() => handleNavMenuClick(page)}>
									<Typography textAlign="center">{page}</Typography>
								</MenuItem>
							))}
						</Menu>
					</Box>
					<Typography
						variant="h5"
						noWrap
						onClick={handleLogoClick}
						sx={{
							mr: 2,
							display: { xs: "flex", md: "none" },
							flexGrow: 1,
							fontFamily: "monospace",
							fontWeight: 700,
							letterSpacing: ".3rem",
							color: "inherit",
							textDecoration: "none",
							cursor: "pointer",
						}}
					>
						PHARMACY
					</Typography>
					<Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
						{pagesToDisplay.map((page) => (
							<Button
								key={page}
								onClick={() => handleNavMenuClick(page)}
								sx={{ my: 2, color: "white", display: "block" }}
							>
								{page}
							</Button>
						))}
					</Box>
					{!isAdmin && (
						<Box sx={{ flexGrow: 0 }}>
							<Tooltip title="Open settings">
								<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
									<Avatar alt="Pharmacy" src="/static/images/avatar/2.jpg" />
								</IconButton>
							</Tooltip>
							<Menu
								sx={{ mt: "45px" }}
								id="menu-appbar"
								anchorEl={anchorElUser}
								anchorOrigin={{
									vertical: "top",
									horizontal: "right",
								}}
								keepMounted
								transformOrigin={{
									vertical: "top",
									horizontal: "right",
								}}
								open={Boolean(anchorElUser)}
								onClose={handleCloseUserMenu}
							>
								{settings.map((setting) => (
									<MenuItem
										key={setting}
										onClick={() => handleUserMenuClick(setting)}
									>
										<Typography textAlign="center">{setting}</Typography>
									</MenuItem>
								))}
							</Menu>
						</Box>
					)}
				</Toolbar>
			</Container>
		</AppBar>
	);
}

export default ResponsiveAppBar;
