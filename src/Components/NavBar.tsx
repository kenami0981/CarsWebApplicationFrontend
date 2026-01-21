import { NavLink, useNavigate } from "react-router-dom";
import "../Styles/NavBar.css";
import autoIcon from "../Media/auto_icon_menu.png";
import { useAuth } from "../Context/AuthContext";
import { useState } from "react";

export default function NavBar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setOpen(false);
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="nav-container">

        <div className="nav-left">
          <img src={autoIcon} alt="car icon" className="nav-icon" />
          <NavLink to="/cars" className="nav-item">CARS</NavLink>
          <NavLink to="/add-car" className="nav-item">ADD CAR</NavLink>
        </div>

        <div className="nav-right">
          {user ? (
            <div className="user-wrapper">
              <div
                className="user-avatar"
                onClick={() => setOpen(prev => !prev)}
              >
                {user.displayName.charAt(0).toUpperCase()}
              </div>

              {open && (
                <div className="user-dropdown">
                  <p className="user-title">{user.displayName}</p>
                  <p className="user-info">@{user.userName}</p>

                  <button className="logout-btn" onClick={handleLogout}>
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button className="login-btn" onClick={() => navigate("/login")}>
              Login
            </button>
          )}
        </div>

      </div>
    </nav>
  );
}
