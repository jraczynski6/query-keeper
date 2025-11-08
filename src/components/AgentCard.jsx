import '../styles/AgentCard.css';
export default function AgentCard({
    firstName,
    lastName,
    agency,
    onSelect 
}) {
    return (
        <div className="agent-card" onClick={onSelect}>
            <h3>{firstName}{lastName}</h3>
            <p className="agent-agency">{agency}</p>
        </div>
    );
}