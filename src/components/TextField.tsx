import TextField from "@mui/material/TextField";
import { ChangeEvent } from "react";

type CustomTextFieldProps = {
	label: string;
	variant: "outlined" | "filled" | "standard";
	helperText?: string;
	value?: string;
	onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
	type?: string;
	required?: boolean;
};

export default function CustomTextField({
	label,
	variant,
	helperText,
	value,
	onChange,
	type = "text",
	required = false,
}: CustomTextFieldProps) {
	return (
		<TextField
			label={label}
			variant={variant}
			helperText={helperText}
			value={value}
			onChange={onChange}
			type={type}
			required={required}
			fullWidth
			margin="normal"
		></TextField>
	);
}
