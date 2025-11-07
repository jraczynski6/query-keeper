import React from "react";
import { useNavigate } from "react-router-dom";

export default function SignInModal(isOpen, onClose) {
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
                </div>
            </div>
        )
}