import React, {
	createContext,
	useContext,
	useState,
	useEffect,
	ReactNode,
} from "react";
import { LoginResponseDTO } from "../types/Auth";

interface AuthContextType {
	user: LoginResponseDTO | null;
	login: (userData: LoginResponseDTO) => void;
	logout: () => void;
	isAdmin: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [user, setUser] = useState<LoginResponseDTO | null>(null);

	useEffect(() => {
		try {
			const storedUser = localStorage.getItem("user");
			if (storedUser) {
				setUser(JSON.parse(storedUser));
			}
		} catch (error) {
			localStorage.removeItem("user");
		}
	}, []);

	const login = (userData: LoginResponseDTO) => {
		localStorage.setItem("user", JSON.stringify(userData));
		setUser(userData);
	};

	const logout = () => {
		localStorage.removeItem("user");
		setUser(null);
	};

	const isAdmin = (): boolean => {
		return (
			user?.role.includes("ROLE_ADMIN") ||
			(user?.role?.includes("ROLE_ADMIN") ?? false)
		);
	};

	return (
		<AuthContext.Provider value={{ user, login, logout, isAdmin }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = (): AuthContextType => {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};
