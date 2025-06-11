import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export default function Opinion() {
	return (
		<Box
			textAlign="center"
			px={2}
			py={4}
			bgcolor="primary.light"
			borderRadius={2}
		>
			<Typography variant="h6" fontStyle="italic">
				"Best online pharmacy ever! Fast delivery and super friendly support."
			</Typography>
			<Typography variant="subtitle2" mt={1}>
				— All customers
			</Typography>
		</Box>
	);
}
