import { useState, useEffect } from "react";
import QuerySubmissionModal from "../components/modals/QuerySubmissionModal";
import { useParams, useNavigate, Link } from "react-router-dom";
import "./SelectedProject.css";


export default function SelectedProject() {

    const navigate = useNavigate();
    const { projectId } = useParams(); //project id from route

    //Project State
    const [project, setProject] = useState(null);
    const [queryDraft, setQueryDraft] = useState("");
    const [selectedSize, setSelectedSize] = useState("");
    const [sampleText, setSampleText] = useState("");

    // Submission modal state
    const [showModal, setShowModal] = useState(false);
    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);

    // Generate modal state 
    // TODO: Regenerate Query
    const [showGenerate, setShowGenerate] = useState(false);
    const openGenerate = () => setShowGenerate(true);
    const closeGenerate = () => setShowGenerate(false);

    //save project 
    const saveProject = () => {
        if (!project) return; // fallback

        const updatedProject = {
            ...project, //copy properties 
            sampleSize: selectedSize ? Number(selectedSize) : project.sampleSize, // convert sampleSize from string to number
            sampleText: sampleText,
            query: queryDraft
        };
        setProject(updatedProject);

        //update project arrays in local storage
        const savedProjects = JSON.parse(localStorage.getItem("projects")) || [];
        const updatedProjects = savedProjects.map(p => //replace old project
            p.id === updatedProject.id ? updatedProject : p
        );
        localStorage.setItem("projects", JSON.stringify(updatedProjects));
    };

    // load project when component mounts or params change
    useEffect(() => {
        const savedProjects = JSON.parse(localStorage.getItem("projects")) || [];
        const loadedProject = savedProjects.find(p => p.id.toString() === projectId);

        if (loadedProject) {
            setProject(loadedProject);
            setQueryDraft(loadedProject.query || "");
            setSelectedSize(loadedProject.sampleSize?.toString() || "");
            setSampleText(loadedProject.sampleText || "");
        }
    }, [projectId]);


    //fallback no project
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

                        <div className="agent-info">
                            <h2>Agent Info</h2>
                            <p>
                                <Link to={`/agents/${project.agent.id}`}>
                                    {project.agent.firstName} {project.agent.lastName}
                                </Link>
                            </p>
                            <p>{project.agent.agency}</p>
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
// TODO: Add page preview for sample text
// TODO: make copy buttons work