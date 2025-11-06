import '../styles/AgentCard.css';
export default function AgentCard({
    firstname,
    lastname,
    agency,
    email,
    website,
    twitter,
    instagram,
    onSelect
}) {
    return (
        <div className="agent-card" onClick={onSelect}>
            <h3>{firstname}{lastname}</h3>
            <p className="agent-agency">{agency}</p>
            <p className="agent-email">{email}</p>
            <div className="agent-links">
                {website && <span>{website}</span>}
                {twitter && <span>{twitter}</span>}
                {instagram && <span>{instagram}</span>}
            </div>
        </div>
    );
}