import NavMenu from "../components/NavMenu/NavMenu";
import Header from "../components/Header";
import Footer from "../components/footer";

export default function Agents() {
    return (
        <div className="agents-page">
            <Header />
            <NavMenu />
            <main className="agents-content">
                <div className="split-container">

                    {/* Left: Agents List */}
                    <section className="agents-list-panel">
                        <h2>Agents</h2>
                        <button className="create-agent-btn">Create New Agent</button>
                        {/* Agent Cards mapped here */}
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
                        <button className="edit-agent-btn">Go to Selected Agent</button>

                    </section>

                </div>
            </main>
            <Footer />
        </div>
    )
}