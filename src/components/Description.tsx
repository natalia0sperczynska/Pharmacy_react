type DescriptionProps = {
	children: React.ReactNode;
	color?: string;
};

export default function Description({ children, color }: DescriptionProps) {
	// const{childrem, color} = input;
	return <p style={{ color }}>{children}</p>;
}
