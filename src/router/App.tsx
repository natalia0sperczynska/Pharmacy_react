import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import About from "../pages/About";
import HomePage from "../pages/HomePage";
import PurchasePage from "../pages/PurchasePage";
import { AuthProvider } from "../context/AuthContext";
import ProfilePage from "../pages/ProfilePage";
import AccountPage from "../pages/AccountPage";
import Purchases from "../pages/AccountPage";
import Meds from "../pages/Meds";

export default function App() {
	return (
		<AuthProvider>
			<BrowserRouter>
				<Routes>
					<Route path="/login" element={<Login />} />
					<Route path="/" element={<About />} />
					<Route path="/home" element={<HomePage />} />
					<Route path="/purchase-history" element={<PurchasePage />} />
					<Route path="/my-profile" element={<ProfilePage />} />
					<Route path="/account" element={<AccountPage />} />
					<Route path="/purchases" element={<Purchases />} />
					<Route path="/meds" element={<Meds />} />
				</Routes>
			</BrowserRouter>
		</AuthProvider>
	);
}
