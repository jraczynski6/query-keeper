import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CreateAgentModal from "../components/modals/CreateAgentModal";
import AgentCard from "../components/AgentCard";

export default function Agents() {
    const navigate = useNavigate();

    // Sample Agent array
    const [agents, setAgents] = useState([
        {
            id: 1,
            firstName: "Jane",
            lastName: "Doe",
            agency: "Best Agent Agency",
            email: "janedoe@email.com",
            website: "janedoeagent.com",
            twitter: "@janedoe",
            instagram: "@janedoe_",
            notes: "This agent is prefers fantasy"
        }
    ]);

    const [SelectedAgent, setSelectedAgent] = useState(agents[0]);
    // state to render modal
    const [showModal, setShowModal] = useState(false);

    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);

    // TODO: Add logic to generate new agent cards
    return (
        <div className="agents-page">
            <main className="agents-content">
                <div className="split-container">

                    {/* Left: Agents List */}
                    <section className="agents-list-panel">
                        <h2>Agents</h2>
                        <button className="create-agent-btn" onClick={openModal}>Create New Agent</button>
                        
                        {agents.map(( agent ) => (
                            <AgentCard
                                key={agent.id}
                                {...agent}
                                onSelect={() => setSelectedAgent(agent)}
                            />
                        ))}
                    </section>

                    {/* Right: Agent Preview */}
                    <section className="agent-preview-panel">
                        <h2>Agent preview</h2>

                        {/* TODO: create agent preview card component */}
                        <div className="preview-card">
                            <h3>Agent Name</h3>
                            <p className="agent-agency">Agency name</p>
                            <p className="agent-email">Agent Email</p>
                            <p className="agent-links">
                                <span>Website</span>
                                <span>Twitter</span>
                                <span>Intsagram</span>
                            </p>

                            <div className="agent-notes-preview">
                                <h4>Notes:</h4>
                                <p>Agent Notes</p>
                            </div>

                            <div className="same-agency-agents">
                                <h4>Other agents in agency</h4>
                                <ul>
                                    {/* Map agents here */}
                                </ul>
                            </div>

                        </div>
                        {/* TODO: Add logic to open selected agent page */}
                        <button className="edit-agent-btn">Go to Selected Agent</button>

                    </section>

                </div>
            </main>
            {/* Modal */}
            {showModal && <CreateAgentModal onClose={closeModal} />}
        </div>
    )
}