import { NavLink } from "react-router-dom";
import { useNotifications } from "../contexts/NotificationsContext";

export default function Footer() {
    const { addToast } = useNotifications();

    const handleSubscribe = (e) => {
        e.preventDefault();
        addToast("Subscribed");
    }

    const clearAllLocalStorage = () => {
        localStorage.clear();
        alert("local storage cleared!");
    };



    return (
        <footer className="app-footer">
           <div className="footer-note">
                <p>
                    &copy; 2025 Joseph Raczynski. All rights reserved. |
                    <a
                        href="https://github.com/jraczynski6/query-keeper.git"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Open Source on GitHub
                    </a>
                </p>
            </div>
            <nav className="footer-nav">
                <NavLink to="/" className={({ isActive }) => isActive ? "active" : ""}>
                    Home
                </NavLink>
                <NavLink to="/about" className={({ isActive }) => isActive ? "active" : ""}>
                    About
                </NavLink>
                <NavLink to="/about" className={({ isActive }) => isActive ? "active" : ""}>
                    Contact
                </NavLink>
            </nav>
            <div className="footer-newsletter">
                <p>Subscribe to our newsletter for updates.</p>
                <form className="footer-newsletter-form" onSubmit={handleSubscribe}>
                    <input
                        type="email"
                        name="email"
                        placeholder="your email"
                        aria-label="Email address"
                        required
                    />
                    <button type="submit">Subscribe</button>
                </form>
            </div>
        </footer>
    )
}