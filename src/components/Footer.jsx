export default function Footer() {
    return (
        <footer className="app-footer">
            <div className="footer-note">
                <p>Joseph Raczynski. Copyright text</p>
            </div>
            <nav className="footer-nav">
                <ul>
                    <li>Home</li>
                    <li>About</li>
                    <li>Contact</li>
                </ul>
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