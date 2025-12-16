import { NavLink } from "react-router-dom";
import "../Styles/NavBar.css";
import autoIcon from "../Media/auto_icon_menu.png"
import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function NavBar() {
    const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

    return (
        <nav className="navbar">
            <div className="nav-container">
                <img src={autoIcon} alt="car icon" className="nav-icon" />

                <div className="nav-links">
                    <NavLink to="/cars" className="nav-item">CARS</NavLink>
                    <NavLink to="/add-car" className="nav-item">ADD CAR</NavLink>
                    {user ? (
                    <>
                    <span>Hello {user.displayName}</span>
                    <button onClick={handleLogout}>Logout</button>
                    </>
                ) : (
                    <button onClick={() => navigate("/login")}>Login</button>
                )}
                </div>
                <div className="nav-spacer"></div>
            </div>
        </nav>

    );
}
