import React from "react";
import { useNavigate } from "react-router-dom";

export default function RegisterModal({ isOpen, onClose }) {
    const navigate = useNavigate();

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        onClose();
        navigate("/dashboard")
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="modal-close" onClick={onClose}>X</button>
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
            </div>
        </div>
    )
}