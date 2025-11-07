import { useState } from "react";
import RegisterModal from "../components/modals/RegisterModal";

export default function Landing({setAuthenticated}) {
    const [IsRegisterOpen, setRegisterOpen] = useState(false);


    return (
        <div className="landing-page">

            <main className="landing-content">
                <h2>Welcome</h2>
                <p>Welcome Text</p>

                <div className="landing-actions">
                    <button onClick={() => setRegisterOpen(true)}>Register</button>
                </div>

                {/* Register Modal */}
                <RegisterModal
                    isOpen={IsRegisterOpen}
                    onClose={() => setRegisterOpen(false)}
                    OnRegistersuccess={() => setAuthenticated(true)}
                />
            </main>

        </div>
    )
}