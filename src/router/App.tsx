import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import About from "../pages/About";
import HomePage from "../pages/HomePage";
import PurchasePage from "../pages/PurchasePage";
import { AuthProvider } from "../context/AuthContext";
import ProfilePage from "../pages/ProfilePage";
import AccountPage from "../pages/AccountPage";
import PurchaseSuccessful from "../pages/PurchaseSuccessful";
import CartPage from "../pages/Cart";
import { CartProvider } from "../context/CartContext";
import { ShopPage } from "../pages/ShopPage";

export default function App() {
	return (
		<AuthProvider>
			<CartProvider>
				<BrowserRouter>
					<Routes>
						<Route path="/login" element={<Login />} />
						<Route path="/" element={<About />} />
						<Route path="/home" element={<HomePage />} />
						<Route path="/purchase-history" element={<PurchasePage />} />
						<Route path="/my-profile" element={<ProfilePage />} />
						<Route path="/account" element={<AccountPage />} />
						<Route path="/purchase" element={<CartPage />} />
						<Route path="/shop" element={<ShopPage />} />
						<Route path="/purchase-success" element={<PurchaseSuccessful />} />
					</Routes>
				</BrowserRouter>
			</CartProvider>
		</AuthProvider>
	);
}
