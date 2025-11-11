import { useParams, useNavigate } from "react-router-dom";
import React from "react";
import "./SelectedAgent.css";

export default function SelectedAgent() {
    const { id } = useParams();
    // keep naviagate for back button 
    const navigate = useNavigate();

    const agents = JSON.parse(localStorage.getItem("agents")) || [];
    const agent = agents.find(a => a.id.toString() === id);


    // fallback UI
    if (!agent) {
        return (
            <div className="selected-agent-page">
                <p>No agent found. Please create or select an agent from the Agents Page.</p>
                <button onClick={() => navigate("/agents")}>Back to Agents</button>
            </div>
        );
    }

    return (
        <div className="selected-agent-page">
            <main className="selected-agent-content">
                <h2>{agent.firstName} {agent.lastName}</h2>

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
                    <button type="button" className="edit-btn">Edit Agent</button>
                    <button type="button" className="save-btn">Save</button>
                    <button type="button" className="delete-btn">Delete Agent</button>
                </div>
            </main>

        </div>
    )
}