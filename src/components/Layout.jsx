import React, { useEffect } from "react";
import Footer from "./Footer";
import Header from "./Header";
import NavMenu from "./NavMenu/NavMenu";
import "./Layout.css";
import { useState } from "react";
import SignInModal from "./modals/SignInModal";
import NotificationShelf from "./NotificationShelf/NotificationShelf";
import { useNotifications } from "../contexts/NotificationsContext";

export default function Layout({ children, isAuthenticated, setAuthenticated, pageTitle}) {

    //signin modal state
    const [isSignInOpen, setSignInOpen] = useState(false);
    const [isShelfOpen, setShelfOpen] = useState(false);

    // dynamic page title state
    const [title, setTitle] = useState(pageTitle);

    // demo notifications
    const { addToast, addNotification } = useNotifications();

    useEffect(() => {
        const timer = setTimeout(() => {
            addToast("2 week Reminder to follow up with agent Jane Doe");
            addNotification({
                title: "Follow up with Jane Doe",
                message: "Check in with Jane Doe today."
            });
        }, 170000); // 3 minute timer, adjust for demo

        return () => clearTimeout(timer);
    }, []);


    useEffect(() => {
        setTitle(pageTitle);
    }, [pageTitle]);

    return (
        <div className="layout-container">
            <Header
                isAuthenticated={isAuthenticated} // conditionally render based on auth state
                onSignInClick={() => setSignInOpen(true)}
                setAuthenticated={setAuthenticated}
                pageTitle={title}
            />
            <NavMenu
                isAuthenticated={isAuthenticated}
                onToggleShelf={() => setShelfOpen(prev => !prev)}
            />

            {isShelfOpen && <NotificationShelf onClose={() => setShelfOpen(false)} />}

            <main className="main-content">
                {React.Children.map(children, (child) => //child are specific pages 
                    React.cloneElement(child, { setAuthenticated, setTitle }) //clone setAuthenticated/setTitle into every child
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