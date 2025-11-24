import React from "react";
import "./ConfirmModal.css";

export default function ConfirmModal({ isOpen, title, message, onConfirm, onCancel }) {
    if(!isOpen) return null;

    return (
        <div className="confirm-modal-overlay">
            <div className="confirm-modal">
                <h3>{title}</h3>
                <p>{message}</p>
                <div className="confirm-modal-buttons">
                    <button className="confirm-btn" onClick={onConfirm}>Yes</button>
                    <button className="cancel-btn" onClick={onCancel}>Cancel</button>
                </div>
            </div>
        </div>
    );
}