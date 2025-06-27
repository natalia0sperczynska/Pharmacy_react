import { Role } from "./Role";

export type LoginDTO = {
	username: string;
	password: string;
};

export type LoginResponseDTO = {
	id: number;
	username: string;
	token: string;
	role: string[];
};
