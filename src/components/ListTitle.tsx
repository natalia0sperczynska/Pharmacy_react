import Typography from "@mui/material/Typography";
import { SxProps, Theme } from "@mui/material/styles";

interface ListTitleProps {
	text: string;
	sx?: SxProps<Theme>;
	variant?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
	component?: React.ElementType;
}

export default function ListTitle({
	text = "",
	sx = {},
	variant = "h4",
	component = "h4",
}: ListTitleProps) {
	return (
		<Typography
			variant={variant}
			component={component}
			sx={{
				mt: 2,
				mb: 3,
				fontWeight: "bold",
				color: "primary.dark",
				textAlign: "center",
			}}
		>
			{text}
		</Typography>
	);
}
