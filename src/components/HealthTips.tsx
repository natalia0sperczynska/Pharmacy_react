import { useState, useEffect } from "react";
import {
	Box,
	Typography,
	Card,
	CardContent,
	Fade,
	IconButton,
} from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";

const tips = [
	{
		id: 1,
		title: "Stay Hydrated",
		content: "Drink at least 8 glasses of water daily.",
	},
	{
		id: 2,
		title: "Regular Exercise",
		content: "30 minutes of moderate activity daily.",
	},
	{
		id: 3,
		title: "Balanced Diet",
		content: "Eat plenty of fruits and vegetables.",
	},
];

export default function HealthTips() {
	const [index, setIndex] = useState(0);

	const nextTip = () => setIndex((prev) => (prev + 1) % tips.length);
	const prevTip = () =>
		setIndex((prev) => (prev - 1 + tips.length) % tips.length);

	useEffect(() => {
		const timer = setInterval(() => nextTip(), 5000);
		return () => clearInterval(timer);
	}, []);

	return (
		<Box sx={{ my: 6, px: 2, position: "relative", maxWidth: 600, mx: "auto" }}>
			<Typography
				variant="h4"
				align="center"
				gutterBottom
				sx={{ fontWeight: "bold", color: "primary.dark" }}
			>
				Health Tips
			</Typography>

			<Fade in timeout={500} key={tips[index].id}>
				<Card sx={{ p: 3 }}>
					<CardContent>
						<Typography variant="h5" gutterBottom>
							{tips[index].title}
						</Typography>
						<Typography variant="body1">{tips[index].content}</Typography>
					</CardContent>
				</Card>
			</Fade>

			<IconButton
				onClick={prevTip}
				sx={{
					position: "absolute",
					top: "50%",
					left: 0,
					transform: "translateY(-50%)",
				}}
			>
				<ArrowBackIos />
			</IconButton>
			<IconButton
				onClick={nextTip}
				sx={{
					position: "absolute",
					top: "50%",
					right: 0,
					transform: "translateY(-50%)",
				}}
			>
				<ArrowForwardIos />
			</IconButton>
		</Box>
	);
}
