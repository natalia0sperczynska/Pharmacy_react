export interface RegisterRequestDTO {
	email: string;
	username: string;
	password: string;
	role?: string;
}

export interface RegisterResponseDTO {
	userId: number;
	username: string;
	role: string;
}
