import './AgentCard.css';
export default function AgentCard({
    firstName,
    lastName,
    agency,
    onSelect,
    onPin
}) {
    return (
        <div className="dashboard-agent-card" onClick={onSelect}>
            <h3>Agent {firstName}{lastName}</h3>
            <p className="agent-agency"> Agency: {agency}</p>
            <button className="pin-agent-btn" onClick={onPin}>Pin</button>
        </div>
    );
}