import { useParams, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import "./SelectedAgent.css";
import { useNotifications } from "../contexts/NotificationsContext";
import CopyButton from "../components/CopyButton";
import ConfirmModal from "../components/modals/ConfirmModal";

export default function SelectedAgent({setTitle}) {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToast } = useNotifications();

    // Get agents from localStorage
    const agents = JSON.parse(localStorage.getItem("agents")) || [];
    const agent = agents.find(a => a.id && a.id.toString() === id);

    //set header title dynamically
    React.useEffect(() => {
        if (agent) setTitle(`${agent.firstName} ${agent.lastName}`);
    }, [agent, setTitle]);

    // Fallback if agent not found
    if (!agent) {
        return (
            <div className="selected-agent-page">
                <p>No agent found. Please create or select an agent from the Agents Page.</p>
                <button onClick={() => navigate("/agents")}>Back to Agents</button>
            </div>
        );
    }

    // State for edit mode
    const [isEditing, setIsEditing] = React.useState(false);

    // State for form data, initialized after agent exists
    const [formData, setFormData] = React.useState({ ...agent });

    // errors
    const [errors, setErrors] = useState({});

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const validateAgent = () => {
        const newErrors = {};

        if (!formData.firstName.trim()) newErrors.firstName = "First name is required.";
        if (!formData.lastName.trim()) newErrors.lastName = "Last name is required.";
        if (!formData.agency.trim()) newErrors.agency = "Agency is required.";

        if (formData.email && (!formData.email.includes("@") || !formData.email.includes("."))) {
            newErrors.email = "Please enter a valid email address.";
        }

        if (formData.website && !(formData.website.startsWith("http://") || formData.website.startsWith("https://"))) {
            newErrors.website = "Website must start with http:// or https://";
        }

        if (formData.twitter && !formData.twitter.startsWith("@")) {
            newErrors.twitter = "Twitter handle must start with @";
        }

        if (formData.instagram && !formData.instagram.startsWith("@")) {
            newErrors.instagram = "Instagram handle must start with @";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }



    // Save agent changes
    const handleSave = () => {
        if (!validateAgent()) return;

        const agents = JSON.parse(localStorage.getItem("agents")) || [];
        const updatedAgents = agents.map(a => a.id === agent.id ? { ...a, ...formData } : a);
        localStorage.setItem("agents", JSON.stringify(updatedAgents));

        addToast("Agent info saved!")

        setIsEditing(false);
    };

    // Delete agent
    const handleDelete = () => {
        const agents = JSON.parse(localStorage.getItem("agents")) || [];
        const updatedAgents = agents.filter(a => a.id !== agent.id);
        localStorage.setItem("agents", JSON.stringify(updatedAgents));
        navigate("/agents");
    };
    return (
        <div className="selected-agent-page">
            <main className="selected-agent-content">
                <h2>{agent.firstName} {agent.lastName}</h2>

                <div className="agent-panels">
                    {/* Basic Agent Info */}
                    <section className="agent-info-section">
                        <h3>Agent Info</h3>

                        <div className="form-group">
                            <label htmlFor="firstName">Firstname</label>
                            {isEditing ? (
                                <>
                                    <input
                                        id="firstName"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                    />
                                    {errors.firstName && <p className="error-text">{errors.firstName}</p>}
                                </>
                            ) : (
                                <div className="input-with-copy">
                                    <p>{agent.firstName}</p>
                                    <CopyButton textToCopy={agent.firstName} />
                                </div>
                            )}
                        </div>

                        <div className="form-group">
                            <label htmlFor="lastName">Lastname</label>
                            {isEditing ? (
                                <>
                                    <input
                                        id="lastName"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                    />
                                    {errors.lastName && <p className="error-text">{errors.lastName}</p>}
                                </>
                            ) : (
                                <div className="input-with-copy">
                                    <p>{agent.lastName}</p>
                                    <CopyButton textToCopy={agent.lastName} />
                                </div>
                            )}
                        </div>

                        <div className="form-group">
                            <label htmlFor="agency">Agency</label>
                            {isEditing ? (
                                <>
                                    <input
                                        id="agency"
                                        name="agency"
                                        value={formData.agency}
                                        onChange={handleChange}
                                    />
                                    {errors.agency && <p className="error-text">{errors.agency}</p>}
                                </>
                            ) : (
                                <div className="input-with-copy">
                                    <p>{agent.agency}</p>
                                    <CopyButton textToCopy={agent.agency} />
                                </div>
                            )}
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            {isEditing ? (
                                <>
                                    <input
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                    {errors.email && <p className="error-text">{errors.email}</p>}
                                </>
                            ) : (
                                <div className="input-with-copy">
                                    <p>{agent.email}</p>
                                    <CopyButton textToCopy={agent.email} />
                                </div>
                            )}
                        </div>
                    </section>

                    {/* Agent Links */}
                    <section className="agent-links-section">
                        <h3>Agent Links</h3>

                        <div className="form-group">
                            <label htmlFor="website">Website</label>
                            {isEditing ? (
                                <>
                                    <input id="website" name="website" value={formData.website} onChange={handleChange} />
                                    {errors.website && <p className="error-text">{errors.website}</p>}
                                </>
                            ) : (
                                <div className="input-with-copy">
                                    <p>{agent.website}</p>
                                    <CopyButton textToCopy={agent.website} />
                                </div>
                            )}
                        </div>

                        <div className="form-group">
                            <label htmlFor="twitter">Twitter</label>
                            {isEditing ? (
                                <>
                                    <input id="twitter" name="twitter" value={formData.twitter} onChange={handleChange} />
                                    {errors.twitter && <p className="error-text">{errors.twitter}</p>}
                                </>
                            ) : (
                                <div className="input-with-copy">
                                    <p>{agent.twitter}</p>
                                    <CopyButton textToCopy={agent.twitter} />
                                </div>
                            )}
                        </div>

                        <div className="form-group">
                            <label htmlFor="instagram">Instagram</label>
                            {isEditing ? (
                                <>
                                    <input id="instagram" name="instagram" value={formData.instagram} onChange={handleChange} />
                                    {errors.instagram && <p className="error-text">{errors.instagram}</p>}
                                </>
                            ) : (
                                <div className="input-with-copy">
                                    <p>{agent.instagram}</p>
                                    <CopyButton textToCopy={agent.instagram} />
                                </div>
                            )}
                        </div>
                    </section>

                    {/* Agent Notes */}
                    <section className="agent-notes-section">
                        <h3>Agent Notes</h3>
                        <div className="form-group">
                            {isEditing ? (
                                <>
                                    <label htmlFor="notes">Notes</label>
                                    <textarea id="notes" name="notes" value={formData.notes} onChange={handleChange} />
                                </>
                            ) : (
                                <p>{agent.notes}</p>
                            )}
                        </div>
                    </section>

                    {/* Agent Actions */}
                    <div className="agent-actions">
                        <button type="button" className="edit-btn" onClick={() => setIsEditing(true)}>Edit Agent</button>
                        <button type="button" className="save-btn" onClick={handleSave}>Save</button>
                        <button type="button" className="delete-btn" onClick={handleDelete}>Delete Agent</button>
                    </div>
                </div>
            </main>
        </div>
    );
}
