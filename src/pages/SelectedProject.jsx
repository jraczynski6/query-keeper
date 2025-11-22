import { useState, useEffect } from "react";
import QuerySubmissionModal from "../components/modals/QuerySubmissionModal";
import queryTemplates from "../utils/queryTemplates";
import { useParams, useNavigate } from "react-router-dom";
import { useNotifications } from "../contexts/NotificationsContext";
import "./SelectedProject.css";

export default function SelectedProject({ setTitle }) {
    const navigate = useNavigate();
    const { projectId } = useParams();
    const { addToast } = useNotifications();

    //state
    const [project, setProject] = useState(null);
    const [queryDraft, setQueryDraft] = useState("");
    const [selectedTemplateId, setSelectedTemplateId] = useState(queryTemplates[0]?.id);
    const [selectedSize, setSelectedSize] = useState("");
    const [sampleText, setSampleText] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [errors, setErrors] = useState({});

    const [showModal, setShowModal] = useState(false);
    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);

    // Load project
    useEffect(() => {
        const savedProjects = JSON.parse(localStorage.getItem("projects")) || [];
        const savedAgents = JSON.parse(localStorage.getItem("agents")) || [];
        const loadedProject = savedProjects.find((p) => p.id.toString() === projectId);
        if (loadedProject) {

            if (loadedProject.agent?.id) {
                const freshAgent = savedAgents.find(a => a.id === loadedProject.agent.id);
                if (freshAgent) {
                    loadedProject.agent = {...freshAgent};
                }
            }

            setProject(loadedProject);
            setQueryDraft(loadedProject.query || "");
            setSelectedSize(loadedProject.sampleSize?.toString() || "");
            setSampleText(loadedProject.sampleText || "");
            setSelectedTemplateId(loadedProject.templateId || queryTemplates[0]?.id);
        }
    }, [projectId]);


    //dynamic page title
    useEffect(() => {
        console.log("SelectedProject effect running:", project);
        if (project) {
            setTitle(project.title);
        } else {
            setTitle("Project");
        }
    }, [project])

    if (!project) {
        return (
            <div className="selected-project-page">
                <p>No project found. Please select a project.</p>
                <button onClick={() => navigate("/projects")}>Back to Projects</button>
            </div>
        );
    }

    const handleEdit = () => setIsEditing(true);

    const saveProject = () => {
        const updatedProject = {
            ...project,
            sampleSize: selectedSize ? Number(selectedSize) : project.sampleSize,
            sampleText,
            query: queryDraft,
        };
        setProject(updatedProject);

        const savedProjects = JSON.parse(localStorage.getItem("projects")) || [];
        const updatedProjects = savedProjects.map((p) => (p.id === updatedProject.id ? updatedProject : p));
        localStorage.setItem("projects", JSON.stringify(updatedProjects));

        addToast("Project info saved!");
    };

    const validate = () => {
        const newErrors = {};
        if (!project.title.trim()) newErrors.title = "Title is required.";
        if (!project.genre.trim()) newErrors.genre = "Genre is required.";
        if (!project.wordCount || Number(project.wordCount) <= 0) newErrors.wordCount = "Enter a valid word count.";
        if (selectedSize && !sampleText.trim()) newErrors.sampleText = `Enter sample text for ${selectedSize} pages.`;
        if (queryDraft.trim() && queryDraft.trim().length < 50) newErrors.queryDraft = "Query must be at least 50 characters.";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSave = () => {
        if (!validate()) return;
        saveProject();
        setIsEditing(false);
    };

    const handleDelete = () => {
        const savedProjects = JSON.parse(localStorage.getItem("projects")) || [];
        const updatedProjects = savedProjects.filter((p) => p.id !== project.id);
        localStorage.setItem("projects", JSON.stringify(updatedProjects));
        navigate("/projects");
    };

    const handleRegenerateQuery = () => {
        const template = queryTemplates.find((t) => t.id === Number(selectedTemplateId));
        if (!template) return;

        const newQuery = template.template({
            agent: project.agent || { firstName: "", lastName: "" },
            author: project.author || { firstName: "", lastName: "", email: "", website: "" },
            title: project.title || "",
            wordCount: project.wordCount || 0,
            genre: project.genre || "",
        });

        setQueryDraft(newQuery);
    };

    return (
        <div className="selected-project-page">
            <main className="selected-project-content">
                {/* left */}
                <aside className="panel panel-actions">
                    <h2>Actions</h2>
                    <button onClick={handleEdit}>Edit Query</button>
                    <button onClick={handleSave}>Save</button>
                    <button onClick={openModal}>Submit Query</button>
                    <button onClick={handleDelete} className="delete-btn">Delete Project</button>
                </aside>

                {/* center wrapper */}
                <div className="panel-main-body">
                    {/* Ccenter */}
                    <section className="panel panel-editor">
                        <h2>Editable Document</h2>
                        <div className="editor-controls">
                            <label htmlFor="queryTemplate">Select Template:</label>
                            <select
                                id="queryTemplate"
                                value={selectedTemplateId}
                                onChange={(e) => setSelectedTemplateId(e.target.value)}
                            >
                                {queryTemplates.map((t) => (
                                    <option key={t.id} value={t.id}>
                                        {t.name}
                                    </option>
                                ))}
                            </select>
                            <button type="button" className="regenerate-btn" onClick={handleRegenerateQuery}>
                                Regenerate Query
                            </button>
                        </div>

                        <div className="editor-textarea-wrapper">
                            <textarea
                                value={queryDraft}
                                onChange={(e) => setQueryDraft(e.target.value)}
                                rows={30}
                                readOnly={!isEditing}
                            />
                            {errors.queryDraft && <p className="error">{errors.queryDraft}</p>}
                        </div>
                    </section>

                    {/* right */}
                    <aside className="panel panel-info">
                        <h2>Project Info</h2>

                        <div className="book-info">
                            {isEditing ? (
                                <>
                                    <label>
                                        Title:
                                        <input
                                            value={project.title}
                                            onChange={(e) => setProject((p) => ({ ...p, title: e.target.value }))}
                                        />
                                    </label>
                                    {errors.title && <p className="error">{errors.title}</p>}

                                    <label>
                                        Genre:
                                        <input
                                            value={project.genre}
                                            onChange={(e) => setProject((p) => ({ ...p, genre: e.target.value }))}
                                        />
                                    </label>
                                    {errors.genre && <p className="error">{errors.genre}</p>}

                                    <label>
                                        Word Count:
                                        <input
                                            type="number"
                                            value={project.wordCount}
                                            onChange={(e) =>
                                                setProject((p) => ({ ...p, wordCount: parseInt(e.target.value) || 0 }))
                                            }
                                        />
                                    </label>
                                    {errors.wordCount && <p className="error">{errors.wordCount}</p>}
                                </>
                            ) : (
                                <>
                                    <p>Title: {project.title}</p>
                                    <p>Genre: {project.genre}</p>
                                    <p>Word Count: {project.wordCount}</p>
                                </>
                            )}
                        </div>

                        <fieldset>
                            <legend>Sample Size</legend>
                            <label>
                                Select sample size:
                                <select
                                    value={selectedSize}
                                    onChange={(e) => {
                                        const val = e.target.value;
                                        setSelectedSize(val);
                                        setSampleText(val === project.sampleSize?.toString() ? project.sampleText : "");
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

                            {selectedSize && (
                                <textarea
                                    value={sampleText}
                                    onChange={(e) => setSampleText(e.target.value)}
                                    readOnly={!isEditing}
                                />
                            )}
                        </fieldset>

                        <div className="agent-info">
                            <h3>Agent</h3>
                            <p>Name: {project.agent.firstName} {project.agent.lastName}</p>

                            <h4>Notes</h4>
                            <p>
                                {project.agent.notes?.trim()
                                    ? project.agent.notes
                                    : "No Notes available"}
                            </p>
                        </div>

                    </aside>
                </div>
            </main>

            <QuerySubmissionModal isOpen={showModal} onClose={closeModal} project={project} />
        </div>
    );
}
