import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CreateAgentModal from "../components/modals/CreateAgentModal";
import AgentCard from "../components/AgentCard";
import { createAgent } from "../utils/agentUtils";
import { useDashboard } from "../contexts/DashboardContext";
import "./Agents.css";

export default function Agents() {
    
    //for pinItem
    const { pinItem } = useDashboard();

    // check local storage for saved agent. 
    const [agents, setAgents] = useState(() => {
        const savedAgents = localStorage.getItem("agents");
        if (savedAgents) return JSON.parse(savedAgents);

        // Default agent 
        const defaultAgent = {
            id: crypto.randomUUID(),
            firstName: "Jane",
            lastName: "Doe",
            agency: "Best Agent Agency",
            email: "janedoe@email.com",
            website: "janedoeagent.com",
            twitter: "@janedoe",
            instagram: "@janedoe_",
            notes: "This agent prefers fantasy"
        };

        //  save default agent
        localStorage.setItem("agents", JSON.stringify([defaultAgent]));
        return [defaultAgent];
    });


    // watch agents state change and sync to localStorage
    useEffect(() => {
        localStorage.setItem("agents", JSON.stringify(agents));
    }, [agents]);

    // state to track selected agent
    const [selectedAgent, setSelectedAgent] = useState(agents[0]);
    // state to manage modal visibility
    const [showModal, setShowModal] = useState(false);

    //modal open/close
    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);


    const handlePin = (agent) => {
        pinItem({
            id: `agent-${agent.id}`,
            type: "agent",
            agentData: agent, // required by Dashboard
            link: `/agents/${agent.id}`, // navigation link : Broken 
            position: { x: 50, y: 50 } // default position
        });
    };

    return (
        <div className="agents-page">
            <main className="agents-content">
                <div className="split-container">

                    {/* Left: Agents List */}
                    <section className="agents-list-panel">
                        <h2>Agents</h2>
                        <button className="create-agent-btn" onClick={openModal}>Create New Agent</button>

                        {/* map agents using id */}
                        {agents.map((agent) => (
                            <AgentCard
                                key={agent.id}
                                {...agent} //pass all properties to component
                                onSelect={() => setSelectedAgent(agent)}
                                onPin={() => handlePin(agent)}
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
                                        {/* TODO: Map same agency agents here use strict equality */}
                                    </ul>
                                </div>
                            </div>
                        ) : (
                            <div className="no-preview-placeholder">
                                <p>Select an agent card to view Details</p>
                            </div>
                        )}
                        {/* navigation hook: push route with state */}
                        {selectedAgent && (
                            <Link
                                to={`/agents/${selectedAgent.id}`}
                                className="edit-agent-btn"
                            >
                                Go To Selected Agent
                            </Link>
                        )}
                    </section>

                </div>
            </main>
            {/* Modal */}
            {showModal &&
                <CreateAgentModal
                    onClose={closeModal}
                    onCreate={(agentData) => {
                        const newAgentwithId = { ...agentData, id: crypto.randomUUID }; // generate id
                        setAgents(prev => [...prev, newAgentwithId]); // update state with spread + newAgentWithId
                        setSelectedAgent(newAgentwithId);
                    }}
                />}
        </div>
    )
}


// TODO: Edit/Delete agent
// TODO: Filter/Search agents
// TODO: Other agents in the same agency
// TODO: Form validation
// TODO: Default avatars or profile pictures
// TODO: Sort agents list
// TODO: Copy agent info