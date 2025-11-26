import { NavLink } from "react-router-dom";
import "../Styles/NavBar.css";
import autoIcon from "../Media/auto_icon_menu.png"

export default function NavBar() {
    return (
        <nav className="navbar">
            <div className="nav-container">
                <img src={autoIcon} alt="car icon" className="nav-icon" />

                <div className="nav-links">
                    <NavLink to="/cars" className="nav-item">CARS</NavLink>
                    <NavLink to="/add-car" className="nav-item">ADD CAR</NavLink>
                </div>
                <div className="nav-spacer"></div>
            </div>
        </nav>

    );
}
