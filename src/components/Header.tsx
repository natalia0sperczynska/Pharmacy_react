import Typography from "@mui/material/Typography";
export default function Header() {
	return (
		<Typography
			variant="h4"
			component="h4"
			sx={{
				mt: 2,
				mb: 3,
				fontWeight: "bold",
				color: "primary.dark",
			}}
		>
			Pharmacy
		</Typography>
	);
}
