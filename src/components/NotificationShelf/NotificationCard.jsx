import React from "react";
import "./NotificationCard.css";

export default function NotificationCard({message, onClose}) {

    return (
        <div className="notification-card">
            {/* display message */}
            <span>{message}</span>

            {/* remove notification */}
            <button className="remove-btn" onClick={onClose}>Remove</button>
        </div>
    );
}