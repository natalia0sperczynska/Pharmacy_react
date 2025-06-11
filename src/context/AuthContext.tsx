import { createContext, useContext, useState } from "react";

type AuthContextType = {
	login: (token: string, userId: string) => void;
	logout: () => void;
	user: { id: string; token: string } | null;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [user, setUser] = useState<{ id: string; token: string } | null>(null);

	const login = (token: string, userId: string) => {
		setUser({ id: userId, token });
	};

	const logout = () => {
		setUser(null);
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
