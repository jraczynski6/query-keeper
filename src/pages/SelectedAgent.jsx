import Footer from "../components/footer";
import Header from "../components/Header";
import NavMenu from "../components/NavMenu/NavMenu";

export default function SelectedAgent() {
    return (
        <div className="selected-agent-page">
            <Header />
            <NavMenu />
            <main className="slected-agent-content">
                <h2>Selected Agent</h2>

                {/* Basic Agent Info  */}
                <section className="agent-info-section">
                    <h3>Agent Info</h3>
                    <p id="agent-firstname">Firstname:</p>
                    <p id="agent-lastname">Lastname:</p>
                    <p id="agent-agency">Agency:</p>
                    <p id="agent-email">Email</p>
                </section>

                {/* Agent Links */}
                <section className="agent-links-section">
                    <h3>Agent Links</h3>
                    <p id="agent-website">Website</p>
                    <p id="agent-twitter">Twitter:</p>
                    <p id="agent-instagram">Instagram</p>
                </section>

                {/* Agent Notes */}
                <section className="agent-notes-section">
                    <h3>Agent Notes</h3>
                    {/* TODO: Agent Notes component here */}
                </section>

                {/* Agent Actions */}
                <div className="agent-actions">
                    <button type="button" className="edit-btn">Edit Agent</button>
                    <button type="button" className="save-btn">Save</button>
                    <button type="button" className="delete-btn">Delete Agent</button>
                </div>
            </main>
            
            <Footer />
        </div>
    )
}