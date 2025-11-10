import '../styles/AgentCard.css';
export default function AgentCard({
    firstName,
    lastName,
    agency,
    onSelect,
    onPin
}) {
    return (
        <div className="agent-card" onClick={onSelect}>
            <h3>{firstName}{lastName}</h3>
            <p className="agent-agency">{agency}</p>
            <button className="pin-agent-btn" onClick={onPin}>Pin</button>
        </div>
    );
}