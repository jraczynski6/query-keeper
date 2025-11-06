import Header from "../components/Header";
import NavMenu from "../components/NavMenu/NavMenu";
import Footer from "../components/footer";

export default function SelectedProject() {
    return (
        <div className="selected-project-page">
            <Header />
            <NavMenu />

            <main className="selected-project-content">
                <div className="tri-split-container">

                    {/* Left: Actions */}
                    <section className="project-actions-panel">
                        <h2>Actions</h2>
                        <button>Edit Query</button>
                        <button>Save</button>
                        <button>Delete Project</button>
                        <button>Submit Query</button>
                    </section>

                    {/* Center: Editable Document */}
                    <section className="project-editor-panel">
                        <h2>Editable Document</h2>
                        <div className="project-editor">
                            <p>Query Draft will appear here</p>
                        </div>
                    </section>

                    {/* Right: Project Info */}
                    <section className="project-info-panel">
                        <h2>Project Info</h2>

                        <div className="book-info">
                            <h3>Book Info</h3>
                            <p>Title</p>
                            <p>Genre</p>
                            <p>Word Count</p>
                        </div>

                        <div className="agent-info">
                            <h2>Agent Info</h2>
                            <p>Name</p>
                            <p>Agency</p>
                            <p></p>
                        </div>

                        {/* TODO: Make agent Notes component */}
                    </section>
                </div>
            </main>
            <Footer />
        </div>
    )
}