import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import MedsList_placeholder from "../jpg/MedsList_placeholder.jpg";

export default function MedsList() {
	return (
		<ImageList sx={{ width: 500, height: 450 }}>
			{itemData.map((item) => (
				<ImageListItem key={item.img}>
					<img
						srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
						src={`${item.img}?w=248&fit=crop&auto=format`}
						alt={item.title}
						loading="lazy"
					/>
					<ImageListItemBar title={item.title} position="below" />
				</ImageListItem>
			))}
		</ImageList>
	);
}

const itemData = [
	{
		img: MedsList_placeholder,
		title: "Vitamin C",
	},
	{
		img: MedsList_placeholder,
		title: "Magnez",
	},
	{
		img: MedsList_placeholder,
		title: "Ibuprofen",
	},
	{
		img: MedsList_placeholder,
		title: "Nospa",
	},
	{
		img: MedsList_placeholder,
		title: "Polopiryna",
	},
	{
		img: MedsList_placeholder,
		title: "Paracetamol",
	},
	{
		img: MedsList_placeholder,
		title: "",
	},
	{
		img: MedsList_placeholder,
		title: "",
	},
	{
		img: MedsList_placeholder,
		title: "",
	},
];
