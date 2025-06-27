import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AdminRoute = () => {
	const { user } = useAuth();
	if (!user) {
		return <Navigate to="/login" replace />;
	}
	if (user.role.includes("ROLE_ADMIN")) {
		return <Outlet />;
	} else {
		return <Navigate to="/home" replace />;
	}
};
export default AdminRoute;
