import * as React from "react";
import { useEffect, useState } from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import IconButton from "@mui/material/IconButton";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import MedsList_placeholder from "../jpg/MedsList_placeholder.jpg";
import { getMeds } from "../api/meds";
import { Med } from "../types/Med";
interface MedsListProps {
	onAddToCart: (med: Med) => void;
}

export default function MedsList({ onAddToCart }: MedsListProps) {
	const [meds, setMeds] = useState<Med[]>([]);
	const [loading, setLoading] = useState(true);

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
		<ImageList sx={{ width: "100%", maxWidth: 800, height: "auto" }}>
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
						subtitle={`${med.company_name}, ${med.price.toFixed(2)} zł`}
						position="below"
						actionIcon={
							<IconButton
								sx={{ color: "primary.main" }}
								aria-label={`add ${med.name} to cart`}
								onClick={() => onAddToCart(med)}
							>
								<AddShoppingCartIcon />
							</IconButton>
						}
					/>
				</ImageListItem>
			))}
		</ImageList>
	);
}
