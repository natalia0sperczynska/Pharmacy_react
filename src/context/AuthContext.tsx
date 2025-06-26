import { createContext, useContext, useEffect, useState } from "react";
import { useLocalStorage } from "../useLocalStorage";
import { User } from "../types/User";

type AuthContextType = {
	login: (token: string, userId: number, username: string) => void;
	logout: () => void;
	user: User | null;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [user, setUser] = useLocalStorage<User | null>("user", null);

	const login = (token: string, userId: number, username: string) => {
		const userData: User = { id: userId, token, username };
		setUser(userData);
		localStorage.setItem("authToken", token);
		// localStorage.setItem("user", JSON.stringify(userData));
	};

	const logout = () => {
		setUser(null);
		localStorage.removeItem("authToken");
		// localStorage.removeItem("user");
	};

	return (
		<AuthContext.Provider value={{ user, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
}
