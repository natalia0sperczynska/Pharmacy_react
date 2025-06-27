import * as React from "react";
import { createContext, useContext, useEffect, useState } from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import MedsList_placeholder from "../jpg/MedsList_placeholder.jpg";
import { getMeds } from "../api/meds";
import { Med } from "../types/Med";

export default function MedsListMain() {
	const [meds, setMeds] = useState<Med[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	useEffect(() => {
		const fetchMeds = async () => {
			try {
				const data = await getMeds();
				setMeds(data);
			} catch (error) {
				console.error(error);
			} finally {
				setLoading(false);
			}
		};

		fetchMeds();
	}, []);

	if (loading) return <div>Loading meds...</div>;
	if (meds.length === 0) return <div>No meds found</div>;

	return (
		<ImageList sx={{ width: 500, height: 450 }}>
			{meds.map((med) => (
				<ImageListItem key={med.id}>
					<img
						src={MedsList_placeholder}
						srcSet={MedsList_placeholder}
						alt={med.name}
						loading="lazy"
					/>
					<ImageListItemBar
						title={med.name}
						subtitle={`${med.company_name}, ${med.price}$`}
						position="below"
					/>
				</ImageListItem>
			))}
		</ImageList>
	);
}
