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
                    {/* Basic Agent Info  */}
                    <section className="agent-info-section">
                        <h3>Agent Info</h3>
                        <p id="agent-firstname">Firstname: {agent.firstName}</p>
                        <p id="agent-lastname">Lastname: {agent.lastName}</p>
                        <p id="agent-agency">Agency: {agent.agency}</p>
                        <p id="agent-email">Email: {agent.email}</p>
                    </section>

                    {/* Agent Links */}
                    <section className="agent-links-section">
                        <h3>Agent Links</h3>
                        <p id="agent-website">Website: {agent.website}</p>
                        <p id="agent-twitter">Twitter: {agent.twitter}</p>
                        <p id="agent-instagram">Instagram: {agent.instagram}</p>
                    </section>

                    {/* Agent Notes */}
                    <section className="agent-notes-section">
                        <h3>Agent Notes</h3>
                        <p>{agent.notes}</p>
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