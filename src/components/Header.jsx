import { useLocation } from "react-router-dom";

export default function Header({ isAuthenticated, onSignInClick }) {
    const location = useLocation();

    //convert path to page title
    const pageTitle = location.pathname === "/"
        ? "Home"
        : location.pathname
            .replace("/", "") //remove slash
            .replace(/-/g, " ") //replace hyphens
            .replace(/\b\w/g, c => c.toUpperCase()); //capitalize letters. 

    return (
        <header className="app-header">
            <h1>Query Keeper</h1>
                <h2>{pageTitle}</h2>
            {!isAuthenticated && (
                <button onClick={onSignInClick}>Sign-In</button>
            )}
        </header>
    );
}