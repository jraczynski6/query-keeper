import { useParams, useNavigate } from "react-router-dom";
import React from "react";
import "./SelectedAgent.css";

export default function SelectedAgent() {
    const { id } = useParams();
    const navigate = useNavigate();

    // Get agents from localStorage
    const agents = JSON.parse(localStorage.getItem("agents")) || [];
    const agent = agents.find(a => a.id && a.id.toString() === id);

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

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Save agent changes
    const handleSave = () => {
        const agents = JSON.parse(localStorage.getItem("agents")) || [];
        const updatedAgents = agents.map(a => a.id === agent.id ? { ...a, ...formData } : a);
        localStorage.setItem("agents", JSON.stringify(updatedAgents));
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
                                <input
                                    id="firstName"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                />
                            ) : (
                                <p>{agent.firstName}</p>
                            )}
                        </div>

                        <div className="form-group">
                            <label htmlFor="lastName">Lastname</label>
                            {isEditing ? (
                                <input
                                    id="lastName"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                />
                            ) : (
                                <p>{agent.lastName}</p>
                            )}
                        </div>

                        <div className="form-group">
                            <label htmlFor="agency">Agency</label>
                            {isEditing ? (
                                <input
                                    id="agency"
                                    name="agency"
                                    value={formData.agency}
                                    onChange={handleChange}
                                />
                            ) : (
                                <p>{agent.agency}</p>
                            )}
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            {isEditing ? (
                                <input
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            ) : (
                                <p>{agent.email}</p>
                            )}
                        </div>
                    </section>

                    {/* Agent Links */}
                    <section className="agent-links-section">
                        <h3>Agent Links</h3>

                        <div className="form-group">
                            <label htmlFor="website">Website</label>
                            {isEditing ? <input id="website" name="website" value={formData.website} onChange={handleChange} /> : <p>{agent.website}</p>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="twitter">Twitter</label>
                            {isEditing ? <input id="twitter" name="twitter" value={formData.twitter} onChange={handleChange} /> : <p>{agent.twitter}</p>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="instagram">Instagram</label>
                            {isEditing ? <input id="instagram" name="instagram" value={formData.instagram} onChange={handleChange} /> : <p>{agent.instagram}</p>}
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
    )
}