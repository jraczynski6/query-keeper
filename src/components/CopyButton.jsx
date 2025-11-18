import React from "react";
import { useNotifications } from "../contexts/NotificationsContext";

export default function CopyButton({textToCopy}) {
    const { addToast } = useNotifications();

    // navigator.clipboard.writeText API returns a Promise
    const handleCopy = () => {
        try {
            navigator.clipboard.writeText(textToCopy);
            addToast("Copied to clipboard!");
        } catch {
            addToast("Failed to copy!");
        }
    };

    return (
        <button type="button" onClick={handleCopy} className="copy-btn">
            Copy
        </button>
    );
}