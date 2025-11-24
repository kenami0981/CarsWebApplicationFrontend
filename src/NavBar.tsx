import { NavLink } from "react-router-dom";

export default function NavBar() {
    return (
    <div>
        <nav>
            <ul>
                <li>
                    <NavLink to="/cars">Cars</NavLink>
                </li>
                
            </ul>
        </nav>
    </div>
        
    );
}