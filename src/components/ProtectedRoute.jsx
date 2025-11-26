import { Navigate } from "react-router-dom"
import { useNotifications } from "../contexts/NotificationsContext";
import { useRef } from "react";

export default function ProtectedRoute({ isAuthenticated, children}) {
    const { addToast } = useNotifications();
    const warned = useRef(false);

    if (!isAuthenticated) {
        if (!warned.current) {
            addToast("Please sign in to continue.");
            warned.current = true;
        }
        return <Navigate to={"/"}/>; //redirect
    }
    return children;
}