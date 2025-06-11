import { useState } from "react";
import CustomTextField from "./TextField";
import Stack from "@mui/material/Stack";
import CustomButton from "./Button";
import Fingerprint from "@mui/icons-material/Fingerprint";
export default function Form() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	return (
		<form className="form">
			<Stack direction="column" spacing={2}>
				<CustomTextField label="Email" variant="outlined" />
				<CustomTextField label="Password" variant="outlined" />
				<CustomButton text="Login" icon={<Fingerprint />} size="large" />
			</Stack>
		</form>
	);
}
