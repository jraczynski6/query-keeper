import { useLocation } from "react-router-dom";

export default function Header({ isAuthenticated, onSignInClick, setAuthenticated }) {
    const location = useLocation();

    //convert path to page title
    const pageTitle = location.pathname === "/"
        ? "Home"
        : location.pathname
            .replace("/", "") //remove slash
            .replace(/-/g, " ") //replace hyphens
            .replace(/\b\w/g, c => c.toUpperCase()); //capitalize letters. 


    const onSignOutClick = () => {
        setAuthenticated(false);
    };

    
    return (
        <header className="app-header">

            <div className="left">
                <h1 className="app-name">Query Keeper</h1>
            </div>

            <div className="center">
                <h2>{pageTitle}</h2>
            </div>

            <div className="right">
                {!isAuthenticated ? (
                    <button className="sign-in-btn" onClick={onSignInClick}>Sign-In</button>
                ) : (
                    <button className="sign-out-btn" onClick={onSignOutClick}>Sign-Out</button>
                )}
            </div>
        </header>
    );
}

// TODO: Set up dynamic path name