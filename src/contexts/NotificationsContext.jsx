import { createContext, useContext, useState } from "react";

const NotificationContext = createContext();

export function NotificationsProvider({ children }) {



    // Shelf Notifications
    const [notifications, setNotifications] = useState([]);

    const AddNotification = (message) => {
        const newNotification = {
            id: crypto.randomUUID(),
            message,
            timestamp: new Date().toLocaleString(),
        };

        setNotifications((prev) => [...prev, newNotification]);
    };

    const removeNotification = (id) => {
        setNotifications((prev) => prev.filter((n) => n.id !== id));
    };


    // Toasts
}