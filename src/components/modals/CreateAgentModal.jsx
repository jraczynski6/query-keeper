export default function CreateAgentModal() {
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Create New Agent</h2>
                <button className="modal-close">X</button>

                <form className="create-agent-form">

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

                        <label htmlFor="agent-website">
                            Website:
                            <input id="agent-website" type="text" />
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