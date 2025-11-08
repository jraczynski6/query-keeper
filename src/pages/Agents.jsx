import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CreateAgentModal from "../components/modals/CreateAgentModal";
import AgentCard from "../components/AgentCard";
import { createAgent } from "../utils/agentUtils";

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

    const [selectedAgent, setSelectedAgent] = useState(agents[null]);
    // state to render modal
    const [showModal, setShowModal] = useState(false);

    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);

    // TODO: Add logic to generate new agent cards
    const handleCreateAgent = () => {
        const newAgent = createAgent(); //create new agent obj
        setAgents(prev => [...prev, newAgent]); //save to localState
    }


    return (
        <div className="agents-page">
            <main className="agents-content">
                <div className="split-container">

                    {/* Left: Agents List */}
                    <section className="agents-list-panel">
                        <h2>Agents</h2>
                        <button className="create-agent-btn" onClick={openModal}>Create New Agent</button>

                        {agents.map((agent) => (
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

                        {selectedAgent ? (
                            <div className="preview-card">
                                <h3>{selectedAgent.firstName} {selectedAgent.lastName}</h3>
                                <p className="agent-agency">{selectedAgent.agency}</p>
                                <p className="agent-email">{selectedAgent.email}</p>

                                <p className="agent-links">
                                    <span>{selectedAgent.website}</span>
                                    <span>{selectedAgent.twitter}</span>
                                    <span>{selectedAgent.instagram}</span>
                                </p>

                                <div className="agent-notes-preview">
                                    <h4>Notes:</h4>
                                    <p>{selectedAgent.notes}</p>
                                </div>

                                <div className="same-agency-agents">
                                    <h4>Other agents in agency</h4>
                                    <ul>
                                        {/* TODO: Map agents here use filter */}
                                    </ul>
                                </div>
                            </div>
                        ) : (
                            <div className="no-preview-placeholder">
                                <p>Select an agent card to view Details</p>
                            </div>
                        )}

                        {selectedAgent && (
                            <button
                                className="edit-agent-btn"
                                onClick={() =>
                                    navigate(`/agents/${selectedAgent.id}`, {
                                        state: { agent: selectedAgent },
                                    })
                                }
                            >
                                Go to Selected Agent</button>
                        )}
                    </section>

                </div>
            </main>
            {/* Modal */}
            {showModal && <CreateAgentModal onClose={closeModal} />}
        </div>
    )
}