import { NavLink } from "react-router-dom"
import "./navMenu.css";
import { useState } from "react";
import NotificationShelf from "../NotificationShelf/NotificationShelf";

export default function NavMenu({ isAuthenticated, onToggleShelf }) {

    const handleNotificationClick = () => {
        if (isAuthenticated) {
            onToggleShelf();;
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

                <li>
                    <button onClick={handleNotificationClick} className="nav-link-btn">Notifications</button>
                </li>
            </ul>


        </nav>
    )
}