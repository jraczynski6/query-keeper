import React from "react";
import { useNavigate } from "react-router-dom";
import "./RegisterModal.css";
import { useNotifications } from "../../contexts/NotificationsContext";
import { useState, useEffect } from "react";


export default function RegisterModal({ isOpen, onClose, OnRegistersuccess }) {
    const navigate = useNavigate();
    const { addToast } = useNotifications();

    if (!isOpen) return null;

    //state email, user, pass
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [errors, setErrors] = useState({
        username: "",
        email: "",
        password: "",
    });

    // validation
    function validateForm() {
        const newErrors = {};


        // username
        if (!username.trim()) {
            newErrors.username = "Username is required.";
        } else if (username.length < 5) {
            newErrors.username = "Username must be at least 5 characters."
            //check start of string for valid characters
        } else if (!/^[A-Za-z0-9 _-]+$/.test(username)) {
            newErrors.username = "Username can only contain letters, numbers, spaces, _ and -.";
        }

        //email
        if (!email.trim()) {
            newErrors.email = "Email is required.";
            // check for spaces and proper @ and . 
        } else if (!/^\S+@\S+\.\S+$/.test(email)) {
            newErrors.email = "Enter a valid email.";
        }


        //password
        if (!password.trim()) {
            newErrors.password = "Password is required"
        } else if (password.length < 6) {
            newErrors.password = "Password must be at least 6 characters long."
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    



    const handleSubmit = (e) => {
        e.preventDefault();
        onClose();
        OnRegistersuccess();
        navigate("/dashboard")
        addToast("Account created!");
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