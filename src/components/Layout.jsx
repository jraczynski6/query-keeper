import React from "react";
import Footer from "./footer";
import Header from "./Header";
import NavMenu from "./NavMenu/NavMenu";
import "../styles/Layout.css";
import { useState } from "react";
import SignInModal from "./modals/SignInModal";

export default function Layout({ children, isAuthenticated, setAuthenticated }) {
    const [isSignInOpen, setSignInOpen] = useState(false);

    return (
        <div className="app-layout">
            <Header
                isAuthenticated={isAuthenticated}
                onSignInClick={() => setSignInOpen(true)}
            />
            <NavMenu />
            <main className="main-content">
                {React.Children.map(children, (child) =>
                    React.cloneElement(child, { setAuthenticated })
                )}
            </main>
            <Footer />
            {/* Sign-In Modal */}
            <SignInModal
                isOpen={isSignInOpen}
                onClose={() => setSignInOpen(false)}
                onSignInSuccess={() => setAuthenticated(true)}
            />
        </div>
    );
}