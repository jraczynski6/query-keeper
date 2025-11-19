import React from "react";
import NotificationCard from "./NotificationCard";
import "./NotificationShelf.css";
import { useNotifications } from "../../contexts/NotificationsContext";

export default function NotificationShelf({ onClose }) {
    const { notifications, removeNotification } = useNotifications();

    return (
        <div className="notifications-shelf-overlay">
            <div className="notifications-shelf">
                <div className="shelf-header">

                    <h3>Notifications</h3>

                    <button className="close-shelf-btn" onClick={onClose}>X</button>
                </div>

                 <div className="shelf-content">
                    {notifications.length === 0 && (
                        <p className="empty-text">No notifications yet.</p>
                    )}

                    {notifications.map(n => (
                        <NotificationCard
                            key={n.id}
                            message={n.message}
                            onClose={() => removeNotification(n.id)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
