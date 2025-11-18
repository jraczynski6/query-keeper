import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./SignInModal.css";
import { useNotifications } from "../../contexts/NotificationsContext";

export default function SignInModal({ isOpen, onClose, onSignInSuccess }) {
    // hooks
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({ username: "", password: "" });

    const navigate = useNavigate();
    const { addToast } = useNotifications();

    // Validation function
    function validateForm() {
        const newErrors = {};
        if (!username.trim()) newErrors.username = "Username is required.";
        if (!password.trim()) newErrors.password = "Password is required.";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    //Live validation
    useEffect(() => {
        validateForm();
    }, [username, password]);

    // Submit handler
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        onSignInSuccess();
        onClose();
        navigate("/dashboard");
        addToast("Sign in successful!");
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Sign-In</h2>
                <form className="sign-in-form" onSubmit={handleSubmit}>

                    {/* Username */}
                    <label className="form-label" htmlFor="signin-username">
                        Username
                    </label>
                    <input
                        id="signin-username"
                        type="text"
                        className="form-input"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    {errors.username && <p className="error">{errors.username}</p>}

                    {/* Password */}
                    <label className="form-label" htmlFor="signin-password">
                        Password
                    </label>
                    <input
                        id="signin-password"
                        type="password"
                        className="form-input"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {errors.password && <p className="error">{errors.password}</p>}

                    <button type="submit">Sign-In</button>
                </form>

                <button
                    type="button"
                    className="cancel-button"
                    onClick={onClose}
                >
                    Cancel
                </button>
            </div>
        </div>
    );
}
