import React, { useEffect } from "react";
import Footer from "./footer";
import Header from "./Header";
import NavMenu from "./NavMenu/NavMenu";
import "./Layout.css";
import { useState } from "react";
import SignInModal from "./modals/SignInModal";
import NotificationShelf from "./NotificationShelf/NotificationShelf";
import { useNotifications } from "../contexts/NotificationsContext";

export default function Layout({ children, isAuthenticated, setAuthenticated }) {

    //signin modal state
    const [isSignInOpen, setSignInOpen] = useState(false);
    const [isShelfOpen, setShelfOpen] = useState(false);


    // demo notifications
    const { addToast, addNotification } = useNotifications();

    useEffect(() => {
        const timer = setTimeout(() => {
            addToast("2 week Reminder to follow up with agent Jane Doe");
            addNotification({
                title: "Follow up with Jane Doe",
                message: "Check in with the agent today."
            });
        }, 5000); // three minute timer, adjust for demo

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="layout-container">
            <Header
                isAuthenticated={isAuthenticated} // conditionally render based on auth state
                onSignInClick={() => setSignInOpen(true)}
                setAuthenticated={setAuthenticated}
            />
            <NavMenu
                isAuthenticated={isAuthenticated}
                onToggleShelf={() => setShelfOpen(prev => !prev)}
            />

            {isShelfOpen && <NotificationShelf onClose={() => setShelfOpen(false)} />}

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