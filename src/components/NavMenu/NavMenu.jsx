import { NavLink } from "react-router-dom";
import "./NavMenu.css";

export default function NavMenu({ isAuthenticated, onToggleShelf }) {

    const handleNotificationClick = () => {
        if (isAuthenticated) {
            onToggleShelf();
        } else {
            // TODO: add alert to sign in.
        }
    }

    const navItems = [
        { to: "/dashboard", label: "Dashboard", semantic: "home" },
        { to: "/agents", label: "Agents", semantic: "agents" },
        { to: "/projects", label: "Projects", semantic: "projects" },
        { to: "/author", label: "Author", semantic: "author" },
        { to: "/about", label: "About", semantic: "home" }, // or create a new semantic color if needed
    ];

    return (
        <nav className="nav-menu">
            <ul>
                {navItems.map((item) => (
                    <li key={item.to}>
                        <NavLink
                            to={item.to}
                            className={({ isActive }) => `${item.semantic} ${isActive ? "active" : ""}`}
                        >
                            {item.label}
                        </NavLink>
                    </li>
                ))}

                <li>
                    <button onClick={handleNotificationClick} className="nav-link-btn">Notifications</button>
                </li>
            </ul>
        </nav>
    );
}
