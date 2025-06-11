import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function Welcome() {
	return (
		<Box textAlign="center" mt={4} mb={4}>
			<Typography
				variant="h3"
				sx={{
					fontWeight: "bold",
					fontFamily: "'Playfair Display', serif",
					color: "primary.dark",
				}}
			>
				Welcome to Online Pharmacy
			</Typography>
			<Typography variant="subtitle1" sx={{ mt: 1, color: "primary.dark" }}>
				Your partner in health and wellness
			</Typography>
			<Typography variant="subtitle1" sx={{ mt: 1, color: "primary.dark" }}>
				Login or Register to make an order
			</Typography>
		</Box>
	);
}
