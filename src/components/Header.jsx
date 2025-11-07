export default function Header({isAuthenticated, onSignInClick, pageTitle}) {
    return (
        <header className="app-header">
            <h1>Query Keeper</h1>
            <p>{pageTitle || "Page Title"}</p>
            {!isAuthenticated && (
                <button onClick={onSignInClick}>Sign-In</button>
            )}
        </header>
    );
}