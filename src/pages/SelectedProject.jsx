import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import QuerySubmissionModal from "../components/modals/QuerySubmissionModal";
import { useParams } from "react-router-dom";



export default function SelectedProject() {
    const location = useLocation();
    const navigate = useNavigate();
    const { projectId } = useParams();

    const [project, setProject] = useState(null);
    const [queryDraft, setQueryDraft] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [selectedSize, setSelectedSize] = useState("");
    const [sampleText, setSampleText] = useState("")
    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);

    //save project 
    // TODO: update to handle more than sample size
    const saveProject = () => {
        if (!project) return;

        const updatedProject = {
            ...project,
            sampleSize: selectedSize ? Number(selectedSize) : project.sampleSize,
            sampleText: sampleText,
            query: queryDraft
        };
        setProject(updatedProject);

        //update local storage
        const savedProjects = JSON.parse(localStorage.getItem("projects")) || [];
        const updatedProjects = savedProjects.map(p =>
            p.id === updatedProject.id ? updatedProject : p
        );
        localStorage.setItem("projects", JSON.stringify(updatedProjects));
    };


    useEffect(() => {
        let loadedProject = location.state?.project || null;

        if (!loadedProject && projectId) {
            let savedProjects = [];
            try {
                const raw = localStorage.getItem("projects");
                savedProjects = raw ? JSON.parse(raw) : [];
            } catch (err) {
                console.error("Failed to parse projects from localStorage:", err);
                savedProjects = [];
            }

            loadedProject = savedProjects.find(p => p.id == projectId) || null;;
        }

        if (loadedProject) {
            setProject(loadedProject);
            setQueryDraft(loadedProject.query || "");
            console.log("Loaded project:", loadedProject);
            console.log("Query draft:", loadedProject.query);
        }
    }, [location.state, projectId]);

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
                        <button onClick={saveProject}>Save</button>
                        <button>Delete Project</button>
                        <button onClick={openModal}>Submit Query</button>
                    </section>

                    {/* Center: Editable Document */}
                    <section className="project-editor-panel">
                        <h2>Editable Document</h2>
                        <div className="project-editor">
                            <textarea
                                value={queryDraft}
                                onChange={(e) => setQueryDraft(e.target.value)}
                                rows={15}
                                style={{ width: "100%" }}
                            />
                        </div>
                    </section>

                    {/* Right: Project Info */}
                    <section className="project-info-panel">
                        <h2>Project Info</h2>

                        <div className="book-info">
                            <h3>Book Info</h3>
                            <p>Title: {project.title}</p>
                            <p>Genre: {project.genre}</p>
                            <p>Word Count: {project.wordCount}</p>
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
                                        onChange={(e) => {
                                            const newSize = e.target.value;
                                            setSelectedSize(newSize);

                                            // Load saved text
                                            if (parseInt(newSize, 10) === project.sampleSize) {
                                                setSampleText(project.sampleText || "");
                                            } else {
                                                setSampleText("");
                                            }
                                        }}
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
                                            value={sampleText}
                                            onChange={(e) => setSampleText(e.target.value)}
                                            rows={10}
                                        />
                                    </label>
                                </div>
                            ) : selectedSize ? (
                                <label>
                                    Text for {selectedSize} pages:
                                    <textarea
                                        placeholder="Enter text for selected pages"
                                        value={sampleText}
                                        onChange={(e) => setSampleText(e.target.value)}
                                        rows={10}
                                    />
                                </label>
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

// TODO: edit query draft
// TODO: save/delete button
// TODO: clickable author/agent
// TODO: form validation