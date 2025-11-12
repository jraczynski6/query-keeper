import React from "react";
import { useNavigate } from "react-router-dom";
import "./RegisterModal.css";

export default function RegisterModal({ isOpen, onClose, OnRegistersuccess }) {
    const navigate = useNavigate();

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        onClose();
        OnRegistersuccess();
        navigate("/dashboard")
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content"> 
                <h2>Register</h2>
                <form className="register-form" onSubmit={handleSubmit}>
                    <label>
                        Username
                        <input type="text" name="username" required />
                    </label>

                    <label>
                        Email
                        <input type="email" name="email" required />
                    </label>

                    <label>
                        Password
                        <input type="password" name="password" required />
                    </label>
                    <button type="submit">Register</button>
                </form>
                <button
                    type="button"
                    className="cancel-button"
                    onClick={onClose}
                >Cancel</button>
            </div>
        </div>
    )
}