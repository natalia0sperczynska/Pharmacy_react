import TextField from "@mui/material/TextField";

type CustomTextFieldProps = {
	label: string;
	variant: "outlined" | "filled" | "standard";
	helperText?: string;
};

export default function CustomTextField({
	label,
	variant,
	helperText,
}: CustomTextFieldProps) {
	return (
		<TextField
			label={label}
			variant={variant}
			helperText={helperText}
			fullWidth
			margin="normal"
		></TextField>
	);
}
