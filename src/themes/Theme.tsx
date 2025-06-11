import { createTheme } from "@mui/material/styles";

const theme = createTheme({
	typography: {
		fontFamily: "'Playfair Display', serif",
	},
	palette: {
		primary: {
			main: "#afc8f1",
			light: "#e1f0f7",
			dark: "#6c6c6c",
			contrastText: "#ffffff",
		},
		secondary: {
			main: "#55b5df",
			light: "#e1f0f7",
			dark: "#35708a",
			contrastText: "#ffffff",
		},
	},
});

export default theme;
