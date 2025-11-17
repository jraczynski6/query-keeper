import "./CreateAgentModal.css";
import { useState } from "react";
import { useNotifications } from "../../contexts/NotificationsContext";

export default function CreateAgentModal({ onClose, onCreate }) {
    const [errors, setErrors] = useState({});
    const { addToast } = useNotifications();

    const handleSubmit = (e) => {
        e.preventDefault();

        const newAgent = {
            firstName: e.target["agent-firstname"].value.trim(),
            lastName: e.target["agent-lastname"].value.trim(),
            agency: e.target["agent-agency"].value.trim(),
            email: e.target["agent-email"].value.trim(),
            website: e.target["agent-website"].value.trim(),
            twitter: e.target["agent-twitter"].value.trim(),
            instagram: e.target["agent-instagram"].value.trim(),
            notes: e.target["agent-notes"].value.trim(),
        };

        //validation on submit
        const newErrors = {};


        if (!newAgent.firstName) newErrors.firstName = "First name is required.";
        if (!newAgent.lastName) newErrors.lastName = "Last name is required.";
        if (!newAgent.agency) newErrors.agency = "Agency is required.";

        if (newAgent.email && (!newAgent.email.includes("@") || !newAgent.email.includes("."))) {
            newErrors.email = "Please enter a valid email address.";
        }

        if (newAgent.website && !(newAgent.website.startsWith("http://") || newAgent.website.startsWith("https://"))) {
            newErrors.website = "Website must start with http:// or https://";
        }

        if (newAgent.twitter && !newAgent.twitter.startsWith("@")) {
            newErrors.twitter = "Twitter handle must start with @";
        }

        if (newAgent.instagram && !newAgent.instagram.startsWith("@")) {
            newErrors.instagram = "Instagram handle must start with @";
        }

        setErrors(newErrors);

        // Stop submission if there are errors
        if (Object.keys(newErrors).length > 0) return;

        // No errors → proceed
        onCreate(newAgent);

        addToast("New agent created!");

        onClose();
    };




    return (
        <div className="modal-overlay">
            <div className="create-agent-modal-content">
                <h2>Create New Agent</h2>
                <button className="modal-close" onClick={onClose}>X</button>

                <form className="create-agent-form" onSubmit={handleSubmit}>

                    {/* Basic Agent Info */}
                    <fieldset>
                        <legend>Agent Info</legend>

                        <label htmlFor="agent-firstname">First Name:</label>
                        <input id="agent-firstname" type="text" />
                        {errors.firstName && <p className="error-text">{errors.firstName}</p>}

                        <label htmlFor="agent-lastname">Last Name:</label>
                        <input id="agent-lastname" type="text" />
                        {errors.lastName && <p className="error-text">{errors.lastName}</p>}

                        <label htmlFor="agent-agency">Agency:</label>
                        <input id="agent-agency" type="text" />
                        {errors.agency && <p className="error-text">{errors.agency}</p>}

                        <label htmlFor="agent-email">Email:</label>
                        <input id="agent-email" type="email" />
                        {errors.email && <p className="error-text">{errors.email}</p>}
                    </fieldset>

                    {/* Agent Links */}
                    <fieldset>
                        <legend>Agent Links</legend>

                        <label htmlFor="agent-website">Website:</label>
                        <input id="agent-website" type="text" />
                        {errors.website && <p className="error-text">{errors.website}</p>}

                        <label htmlFor="agent-twitter">Twitter Handle:</label>
                        <input id="agent-twitter" type="text" />
                        {errors.twitter && <p className="error-text">{errors.twitter}</p>}

                        <label htmlFor="agent-instagram">Instagram Handle:</label>
                        <input id="agent-instagram" type="text" />
                        {errors.instagram && <p className="error-text">{errors.instagram}</p>}
                    </fieldset>

                    {/* Agent Notes */}
                    <fieldset>
                        <legend>Agent Notes</legend>
                        <textarea id="agent-notes" placeholder="Enter Notes for Agent"></textarea>
                    </fieldset>

                    {/* Form Actions */}
                    <div className="form-actions">
                        <button type="button" onClick={onClose}>Cancel</button>
                        <button type="submit">Create Agent</button>
                    </div>

                </form>
            </div>
        </div>
    );
}
