import { NavLink } from "react-router-dom"
import "./navMenu.css";
import { useState } from "react";
import NotificationShelf from "../NotificationShelf/NotificationShelf";

export default function NavMenu({ isAuthenticated }) {

    // notification shelf state
    const [isShelfOpen, setShelfOpen] = useState(false);

    const handleNotificationClick = () => {
        if (isAuthenticated) {
            setShelfOpen(prev => !prev);
        } else {
            // TODO: add alert to sign in.
        }
    }

    return (
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
                    <NavLink to={"/about"} className={({ isActive }) => isActive ? "active" : ""}>
                        About
                    </NavLink>
                </li>

                {/* Add link for shelf */}
                <li>
                    <button onClick={handleNotificationClick}>Notifications</button>
                </li>
            </ul>

            {isShelfOpen &&
                <NotificationShelf
                    onClose={() => setShelfOpen(false)}
                />
            }
        </nav>
    )
}