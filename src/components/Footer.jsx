import { NavLink } from "react-router-dom";

export default function Footer() {
    const clearAllLocalStorage = () => {
        localStorage.clear();
        alert("local storage cleared!");
    };



    return (
        <footer className="app-footer">
            <div className="footer-note">
                <p>Joseph Raczynski. Copyright text</p>

                <button
                    onClick={clearAllLocalStorage}
                    style={{
                        marginTop: "0.5rem",
                        padding: "0.5rem 1rem",
                        background: "#ff5555",
                        color: "#fff",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                    }}
                >
                    Clear Local Storage
                </button>

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
                <form className="footer-newsletter-form">
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