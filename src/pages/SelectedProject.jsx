import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import QuerySubmissionModal from "../components/modals/QuerySubmissionModal";



export default function SelectedProject() {
    const location = useLocation();
    const navigate = useNavigate();
    const [project] = useState(location.state?.project || null);
    const [showModal, setShowModal] = useState(false);
    const [selectedSize, setSelectedSize] = useState("")
    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);

    if (!project) {
        return (
            <div className="selected-project-page">
                <p>No project found. Please select a project from the Projects Page.</p>
                <button onClick={() => navigate("/projects")}>Back to Projects</button>
            </div>
        );
    }

    return (
        <div className="selected-project-page">

            <main className="selected-project-content">
                <div className="tri-split-container">

                    {/* Left: Actions */}
                    <section className="project-actions-panel">
                        <h2>Actions</h2>
                        <button>Edit Query</button>
                        <button>Save</button>
                        <button>Delete Project</button>
                        <button onClick={openModal}>Submit Query</button>
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
                            <p>Title: {project.title}</p>
                            <p>Genre: {project.genre}</p>
                            <p>Word Count: {project.wordcount}</p>
                        </div>

                        <div
                            className="agent-info"
                            // TODO: Add useParams to link to selected agent
                            onClick={() => navigate("/agent", { state: { agent: project.agent } })}
                        >
                            <h2>Agent Info</h2>
                            <p>Name: {project.agent.firstName} {project.agent.lastName}</p>
                            <p>Agency: {project.agent.agency}</p>
                        </div>

                        <fieldset>
                            <legend>Sample Size</legend>
                            <div className="sample-size-select">
                                <label>
                                    Select sample size:
                                    <select
                                        value={selectedSize}
                                        onChange={(e) => setSelectedSize(e.target.value)}
                                    >
                                        <option value="">Select...</option>
                                        <option value="3">3 Pages</option>
                                        <option value="5">5 Pages</option>
                                        <option value="10">10 Pages</option>
                                        <option value="30">30 Pages</option>
                                        <option value="50">50 Pages</option>
                                    </select>
                                </label>
                            </div>

                            {/* nested ternary is essential for not breaking */}
                            {selectedSize && parseInt(selectedSize) === project.sampleSize ? (
                                <div className="sample-text-entry">
                                    <label>
                                        Text for {selectedSize} pages:
                                        <textarea
                                            placeholder="Text for selected pages"
                                            value={project.sampleText}
                                            rows={10}
                                        />
                                    </label>
                                </div>
                            ) : selectedSize ? (
                                <p className="no-sample-text">
                                    No sample available for {selectedSize} pages.
                                </p>
                            ) : null}
                        </fieldset>

                        {/* TODO: Make agent Notes component */}
                    </section>
                </div>
            </main>
            {/* Modal */}
            <QuerySubmissionModal
                isOpen={showModal}
                onClose={closeModal}
                project={project}
            />
        </div>
    )
}