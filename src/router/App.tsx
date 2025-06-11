import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
//import Home from "../pages/HomePage";
import About from "../pages/About";
import HomePage from "../pages/HomePage";

export default function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/login" element={<Login />} />
				<Route path="/" element={<About />} />
				<Route path="/home" element={<HomePage />} />
			</Routes>
		</BrowserRouter>
	);
}
