import { Role } from "./Role";

export interface User {
	id: number;
	token: string;
	username: string;
	role: Role;
}
