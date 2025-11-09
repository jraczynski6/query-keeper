import React from "react";
import Footer from "./footer";
import Header from "./Header";
import NavMenu from "./NavMenu/NavMenu";
import "../styles/Layout.css";
import { useState } from "react";
import SignInModal from "./modals/SignInModal";

export default function Layout({ children, isAuthenticated, setAuthenticated }) {

    //signin modal state
    const [isSignInOpen, setSignInOpen] = useState(false);

    return (
        <div className="layout-container">
            <Header
                isAuthenticated={isAuthenticated} // conditionally render based on auth state
                onSignInClick={() => setSignInOpen(true)}
                setAuthenticated={setAuthenticated}
            />
            <NavMenu isAuthenticated={isAuthenticated} />
            <main className="main-content">
                {React.Children.map(children, (child) => //child are specific pages 
                    React.cloneElement(child, { setAuthenticated }) //clone setAuthenticated into every child
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