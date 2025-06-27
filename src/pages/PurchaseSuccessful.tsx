import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function PurchaseSuccessful() {
	return (
		<Box sx={{ maxWidth: 600, mx: "auto", p: 3, textAlign: "center" }}>
			<Typography variant="h4" gutterBottom>
				Thank you for your purchase!
			</Typography>
			<Typography variant="body1" sx={{ mb: 3 }}>
				Your order has been placed successfully.
			</Typography>
			<Button variant="contained" component={Link} to="/home" sx={{ mt: 2 }}>
				Back to Home
			</Button>
		</Box>
	);
}
