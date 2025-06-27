import Box from "@mui/material/Box";
import MedsList from "../components/MedsList";
import { useCart } from "../context/CartContext";
import { Med } from "../types/Med";
import Typography from "@mui/material/Typography";
import ResponsiveAppBar from "../components/AppBar";
import Container from "@mui/material/Container";

export const ShopPage: React.FC = () => {
	const { addToCart } = useCart();

	const handleAddToCart = (medToAdd: Med) => {
		addToCart({
			...medToAdd,
			quantity: 1,
		});
		alert(`${medToAdd.name} has been added to cart!`);
	};

	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				minHeight: "100vh",
			}}
		>
			<ResponsiveAppBar />
			<Container
				component="main"
				maxWidth="lg"
				sx={{
					flexGrow: 1,
					py: 4,
					display: "flex",
					flexDirection: "column",
				}}
			>
				<Box
					sx={{
						textAlign: "center",
						mb: 4,
						mt: 2,
					}}
				>
					<Typography
						variant="h3"
						component="h1"
						gutterBottom
						sx={{
							fontWeight: 700,
							color: "primary.main",
						}}
					>
						Our Products
					</Typography>
				</Box>
				<Box
					sx={{
						width: "100%",
						display: "flex",
						justifyContent: "center",
					}}
				>
					<MedsList onAddToCart={handleAddToCart} />
				</Box>
			</Container>
		</Box>
	);
};
