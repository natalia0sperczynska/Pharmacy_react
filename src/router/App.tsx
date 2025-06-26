import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import About from "../pages/About";
import HomePage from "../pages/HomePage";
import PurchasePage from "../pages/PurchasePage";
import { AuthProvider } from "../context/AuthContext";

export default function App() {
	return (
		<AuthProvider>
			<BrowserRouter>
				<Routes>
					<Route path="/login" element={<Login />} />
					<Route path="/" element={<About />} />
					<Route path="/home" element={<HomePage />} />
					<Route path="/purchase-history" element={<PurchasePage />} />
				</Routes>
			</BrowserRouter>
		</AuthProvider>
	);
}
