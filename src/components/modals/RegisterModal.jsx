import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./RegisterModal.css";
import { useNotifications } from "../../contexts/NotificationsContext";

export default function RegisterModal({ isOpen, onClose, OnRegistersuccess }) {
    
    //hooks
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({ username: "", email: "", password: "" });

    const navigate = useNavigate();
    const { addToast } = useNotifications();

    // Validation function
    function validateForm() {
        const newErrors = {};

        // Username
        if (!username.trim()) newErrors.username = "Username is required.";
        else if (username.length < 5) newErrors.username = "Username must be at least 5 characters.";
        else if (!/^[A-Za-z0-9 _-]+$/.test(username)) newErrors.username = "Username can only contain letters, numbers, spaces, _ and -.";

        // Email
        if (!email.trim()) newErrors.email = "Email is required.";
        else if (!/^\S+@\S+\.\S+$/.test(email)) newErrors.email = "Enter a valid email.";

        // Password
        if (!password.trim()) newErrors.password = "Password is required.";
        else if (password.length < 6) newErrors.password = "Password must be at least 6 characters long.";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    // Live validation
    useEffect(() => {
        validateForm();
    }, [username, email, password]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        onClose();
        OnRegistersuccess();
        navigate("/dashboard");
        addToast("Account created!");
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Register</h2>
                <form className="register-form" onSubmit={handleSubmit}>
                    {/* Username */}
                    <label className="form-label" htmlFor="username">Username</label>
                    <input
                        id="username"
                        type="text"
                        className="form-input"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    {errors.username && <p className="error">{errors.username}</p>}

                    {/* Email */}
                    <label className="form-label" htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="email"
                        className="form-input"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {errors.email && <p className="error">{errors.email}</p>}

                    {/* Password */}
                    <label className="form-label" htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        className="form-input"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {errors.password && <p className="error">{errors.password}</p>}

                    <button type="submit">Register</button>
                </form>
                <button type="button" className="cancel-button" onClick={onClose}>Cancel</button>
            </div>
        </div>
    );
}
