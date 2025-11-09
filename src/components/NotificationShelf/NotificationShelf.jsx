import { useState } from "react";
import NotificationCard from "./NotificationCard";

export default function NotificationShelf({ onClose }) {

    //state to hold notifications
    //sample notifications
    const [notifications, setNotifications] = useState([
        { id: 1, message: "Welcome to the app." },
        { id: 2, message: "This is the notifications tab." },
        { id: 3, message: "Here, you get to check reminders about followup emails and more." }
    ]);

    // remove notification from array by id
    const removeNotification = (id) => {
        setNotifications(notifications.filter(n => n.id !== id));
    };



    return (
        <div className="notifications-shelf">
            <div className="shelf-header">
                
                <h3>Notifications</h3>

                <button className="close-shelf-btn" onClick={onClose}>X</button>
            </div>

            <div className="shelf-content">
                {notifications.map(n => (
                    <NotificationCard
                        key={n.id}
                        message={n.message}
                        onClose={() => removeNotification(n.id)}
                    />
                ))}
            </div>
        </div>
    )
}

// TODO: notification card component
// TODO: update shelf to use card
// TODO: logic for add notifications.
// TODO: Basic card styling.