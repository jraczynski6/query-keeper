import { useLocation, useNavigate } from "react-router-dom";

export default function SelectedAgent() {
    const location = useLocation();
    const navigate = useNavigate();

    const agent = location.state?.agent;

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
                <h2>Selected Agent</h2>

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