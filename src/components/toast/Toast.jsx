import React from "react";
import { useNotifications } from "../../contexts/NotificationsContext";
import "./Toast.css";


export default function Toast({id, message}) {

    // destructure useNotifications
    const {removeToast, addNotification } = useNotifications();


    //save to shelf
    const handleClick = () => {
        addNotification(message);
        removeToast(id);
    };

    return (
        <div className="toast" onClick={handleClick}>
            {message}
        </div>
    );

}