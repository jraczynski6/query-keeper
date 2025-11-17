import { createContext, useContext, useState } from "react";

const NotificationContext = createContext();

export function NotificationsProvider({ children }) {



    // Shelf Notifications
    const [notifications, setNotifications] = useState([]);

    //add notification
    const addNotification = (message) => {
        const newNotification = {
            id: crypto.randomUUID(),
            message,
            timestamp: new Date().toLocaleString(),
        };

        setNotifications((prev) => [...prev, newNotification]);
    };

    //remove notification
    const removeNotification = (id) => {
        setNotifications((prev) => prev.filter((n) => n.id !== id));
    };


    // Toasts
    const [toasts, setToasts] = useState([]);

    //add toast
    const addToast = (message) => {
        const id = crypto.randomUUID();

        const newToast = {
            id,
            message,
        };

        setToasts((prev) => [...prev, newToast]);

        //auto dismiss
        setTimeout(() => {
            removeToast(id);
        }, 4000);
    };

    //remove toast, auto
    const removeToast = (id) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    };


    return (
        <NotificationContext.Provider
            value={{
                // shelf
                notifications,
                addNotification,
                removeNotification,

                //tost
                toasts,
                addToast,
                removeToast,
            }}
        >
            {children}
        </NotificationContext.Provider>
    );
}

export function useNotifications() {
    return useContext(NotificationContext);
}