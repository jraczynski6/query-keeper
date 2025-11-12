import React from "react";
import { useNavigate } from "react-router-dom";
import "./SignInModal.css";

export default function SignInModal({ isOpen, onClose, onSignInSuccess }) {
    const navigate = useNavigate();

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        onSignInSuccess();
        onClose();
        navigate("/dashboard")
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Sign-In</h2>
                <form className="sign-in-form" onSubmit={handleSubmit}>
                    <label>
                        Username
                        <input type="text" name="username" required />
                    </label>

                    <label>
                        Password
                        <input type="password" name="password" required />
                    </label>

                    <button type="submit">Sign-In</button>
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