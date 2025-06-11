import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import About from "../pages/About";
import HomePage from "../pages/HomePage";
import { AuthProvider } from "../context/AuthContext";

export default function App() {
	return (
		<AuthProvider>
			<BrowserRouter>
				<Routes>
					<Route path="/login" element={<Login />} />
					<Route path="/" element={<About />} />
					<Route path="/home" element={<HomePage />} />
				</Routes>
			</BrowserRouter>
		</AuthProvider>
	);
}
