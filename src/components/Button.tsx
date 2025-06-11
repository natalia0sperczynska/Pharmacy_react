import Button from "@mui/material/Button";
import { ReactNode } from "react";

type CustomButtonProps = {
	text: string;
	icon?: ReactNode;
	onClick?: () => void;
	size?: "small" | "large" | "medium";
	color?: "primary" | "secondary" | "error" | "warning" | "success";
	variant?: "contained" | "outlined" | "text";
};

export default function CustomButton({
	text,
	icon,
	onClick,
	size = "medium",
	color = "primary",
	variant = "contained",
}: CustomButtonProps) {
	return (
		<Button
			variant={variant}
			color={color}
			endIcon={icon}
			onClick={onClick}
			size={size}
		>
			{text}
		</Button>
	);
}
