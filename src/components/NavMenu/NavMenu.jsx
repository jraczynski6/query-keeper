import { NavLink } from "react-router-dom"
import "./navMenu.css" ;

export default function NavMenu() {
    return (
        // TODO: Add authcontext for conditional nav menu
        <nav className="nav-menu">
            <ul>
                <li>
                    <NavLink to={"/dashboard"} className={({ isActive }) => isActive ? "active" : ""}>
                    Dashboard
                    </NavLink>
                </li>

                <li>
                    <NavLink to={"/agents"} className={({ isActive }) => isActive ? "active" : ""}>
                    Agents
                    </NavLink>
                </li>

                <li>
                    <NavLink to={"/projects"} className={({ isActive }) => isActive ? "active" : ""}>
                    Projects
                    </NavLink>
                </li>

                <li>
                    <NavLink to={"/author"} className={({ isActive }) => isActive ? "active" : ""}>
                    Author
                    </NavLink>
                </li>

                <li>
                    <NavLink to={"/about"} className={({ isActive}) => isActive ? "active" : ""}>
                    About
                    </NavLink>
                </li>

                {/* Add link for shelf */}
                <li>Notifications</li>
            </ul>
        </nav>
    )
}