import React, { useEffect, useState } from "react";
import { useNotifications } from "../../contexts/NotificationsContext";
import "./Toast.css";


export default function Toast({ id, message }) {

    // destructure useNotifications
    const { removeToast, addNotification } = useNotifications();

    const [isHiding, setIsHiding] = useState(false);

    // Trigger auto-hide
    useEffect(() => {
        const timeout = setTimeout(() => setIsHiding(true), 3500);
        return () => clearTimeout(timeout);
    }, []);

    // Remove toast after hide animation
    useEffect(() => {
        if (isHiding) {
            const timer = setTimeout(() => removeToast(id), 500);
            return () => clearTimeout(timer);
        }
    }, [isHiding, id, removeToast]);

    return (
        <div className={`toast ${isHiding ? "hide" : ""}`}>
            {message}
        </div>
    );

}