import { NavLink } from "react-router-dom";

export default function NavBar() {
    return (
    <div>
        <nav>
            <ul>
                <li>
                    <NavLink to="/cars">CARS</NavLink>
                    <NavLink to="/add-car">ADD CAR</NavLink>
                </li>
                
            </ul>
        </nav>
    </div>
        
    );
}