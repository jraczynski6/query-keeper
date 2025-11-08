

export default function CreateAgentModal({ onClose, onCreate }) {
    const handleSubmit = (e) => {
        e.preventDefault();

        const newAgent = {
            firstName: e.target["agent-firstname"].value,
            lastName: e.target["agent-lastname"].value,
            agency: e.target["agent-agency"].value,
            email: e.target["agent-email"].value,
            website: e.target["agent-website"].value,
            twitter: e.target["agent-twitter"].value,
            instagram: e.target["agent-instagram"].value,
            notes: e.target["agent-notes"].value,
        };

        onCreate(newAgent); // pass the actual object
        onClose();
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Create New Agent</h2>
                <button className="modal-close" onClick={onClose}>X</button>

                <form className="create-agent-form" onSubmit={handleSubmit}>

                    {/* Basic Agent Info */}
                    <fieldset>
                        <legend>Agent Info</legend>

                        <label htmlFor="agent-firstname">
                            First Name:
                            <input id="agent-firstname" type="text" required />
                        </label>

                        <label htmlFor="agent-lastname">
                            Last Name:
                            <input id="agent-lastname" type="text" required />
                        </label>

                        <label htmlFor="agent-agency">
                            Agency:
                            <input id="agent-agency" type="text" required />
                        </label>

                        <label htmlFor="agent-email">
                            Email:
                            <input id="agent-email" type="email" />
                        </label>
                    </fieldset>

                    {/* Agent Links */}
                    <fieldset>
                        <legend>Agent Links</legend>

                        <label htmlFor="agent-website">
                            Website:
                            <input id="agent-website" type="text" />
                        </label>

                        <label htmlFor="agent-twitter">
                            Twitter Handle:
                            <input id="agent-twitter" type="text" />
                        </label>

                        <label htmlFor="agent-instagram">
                            Instagram Handle:
                            <input id="agent-instagram" type="text" />
                        </label>
                    </fieldset>

                    {/* Agent Notes */}
                    <fieldset>
                        <legend>Agent Notes</legend>
                        <textarea id="agent-notes" placeholder="Enter Notes for Agent"></textarea>
                    </fieldset>

                    {/* Form Actions */}
                    <div className="form-actions">
                        <button type="button">Cancel</button>
                        <button type="submit">Create Agent</button>
                    </div>

                </form>
            </div>
        </div>
    )
}