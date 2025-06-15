import { createContext, useContext, useEffect, useState } from "react";
import { useLocalStorage } from "../useLocalStorage";

type User = {
	id: string;
	token: string;
	username: string;
};

type AuthContextType = {
	login: (token: string, userId: string, username: string) => void;
	logout: () => void;
	user: User | null;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [user, setUser] = useState<User | null>(() => {
		const storedUser = localStorage.getItem("user");
		return storedUser ? JSON.parse(storedUser) : null;
	});

	useEffect(() => {
		if (user) {
			localStorage.setItem("user", JSON.stringify(user));
		} else {
			localStorage.removeItem("user");
		}
	}, [user]);

	const login = (token: string, userId: string, username: string) => {
		const userData = { id: userId, token, username };
		setUser(userData);
		localStorage.setItem("authToken", token);
		localStorage.setItem("user", JSON.stringify(userData));
	};

	const logout = () => {
		setUser(null);
		localStorage.removeItem("authToken");
		localStorage.removeItem("user");
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
