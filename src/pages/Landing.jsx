import { useState } from "react";
import RegisterModal from "../components/modals/RegisterModal";
import "./Landing.css";

export default function Landing({ setAuthenticated }) {

    // modal open
    const [IsRegisterOpen, setRegisterOpen] = useState(false);


    return (
        <div className="landing-page">

            <main className="landing-content">
                <h2>Welcome to Query Keeper</h2>
                <p>
                    Your personal hub for managing projects, agents, and notifications.
                    Stay organized, track progress, and collaborate efficiently — all in one place.
                </p>
                <p>
                    Explore your dashboard, pin your favorite agents or projects,
                    and get instant updates with our notifications system.
                </p>
                <p>
                    Ready to get started? Sign in or register to begin your journey!
                </p>

                <div className="landing-actions">
                    <button className="register-btn" onClick={() => setRegisterOpen(true)}>Register</button>
                </div>

                {/* Register Modal */}
                <RegisterModal
                    isOpen={IsRegisterOpen}
                    onClose={() => setRegisterOpen(false)}
                    OnRegistersuccess={() => setAuthenticated(true)} // callback update state
                />
            </main>

        </div>
    )
}