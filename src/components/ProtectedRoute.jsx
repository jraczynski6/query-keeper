import { useRef, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useNotifications } from "../contexts/NotificationsContext";

export default function ProtectedRoute({ isAuthenticated, children }) {
    const { addToast } = useNotifications();
    const warned = useRef(false);

    useEffect(() => {
        if (!isAuthenticated && !warned.current) {
            addToast("Please sign in to continue.");
            warned.current = true;
        }
    }, [isAuthenticated, addToast]);

    if (!isAuthenticated) {
        return <Navigate to="/" />;
    }
    return children;
}