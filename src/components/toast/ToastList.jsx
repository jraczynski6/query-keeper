import React from "react";
import { useNotifications } from "../../contexts/NotificationsContext";
import Toast from "./Toast";
import "./Toast.css";


export default function ToastList() {

    //destructure useNotifications
    const {toasts} = useNotifications();

    return (
        <div className="toast-container">
            {toasts.map(t => (
                <toast key={t.id} id={t.id} message={t.message} />
            ))}
        </div>
    );
}