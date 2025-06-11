import app_logo from "../jpg/app_logo.jpg";
import Avatar from "@mui/material/Avatar";
import { SxProps, Theme } from "@mui/material/styles";

type CustomLogoProps = {
	size?: "small" | "medium" | "large" | "custom";
	sx?: SxProps;
};

export default function Logo({ size = "small", sx }: CustomLogoProps) {
	const sizes = {
		small: { width: 40, height: 40 },
		medium: { width: 80, height: 80 },
		large: { width: 150, height: 200 },
		custom: {},
	};

	return (
		<Avatar
			src={app_logo}
			sx={{
				...sizes[size],
				...sx,
			}}
		/>
	);
}
