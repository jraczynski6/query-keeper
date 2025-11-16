import { useState, useEffect } from "react";
import QuerySubmissionModal from "../components/modals/QuerySubmissionModal";
import queryTemplates from "../utils/queryTemplates";
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
    const [isEditing, setIsEditing] = useState(false);

    // Submission modal state
    const [showModal, setShowModal] = useState(false);
    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);

    // Generate modal state 

    const [selectedTemplateId, setSelectedTemplateId] = useState(
        project?.templateId || queryTemplates[0]?.id
    );

    const [showGenerate, setShowGenerate] = useState(false);
    const openGenerate = () => setShowGenerate(true);
    const closeGenerate = () => setShowGenerate(false);

    // errors state
    const [errors, setErrors] = useState({});

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


    // handleEdit
    const handleEdit = () => {
        setIsEditing(true);

    };

    const validate = () => {
        if (!project) return false;

        const newErrors = {};

        if (!project.title.trim()) {
            newErrors.title = "Title is required.";
        }

        if (!project.genre || !project.genre.trim()) {
            newErrors.genre = "Genre is required.";
        }

        if (!project.wordCount || Number(project.wordCount) <= 0) {
            newErrors.wordCount = "Please enter a valid wordcount.";
        }

        //optional validation
        if (selectedSize && !sampleText.trim()) {
            newErrors.sampleText = `Please enter sample text for ${selectedSize} pages.`;
        }

        if (queryDraft.trim() && queryDraft.trim().length < 50) {
            newErrors.queryDraft = "Query draft must be at least 50 characters if provided.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // handleSave
    const handleSave = () => {
        //fallback
        if (!validate()) return;

        saveProject();
        setIsEditing(false);
    };

    //handle Regeneration
    const handleRegenerateQuery = () => {
        if (!project) return;

        // ensure it finds a number
        const template = queryTemplates.find(t => t.id === Number(selectedTemplateId));
        if (!template) return;

        const newQuery = template.template({
            agent: project.agent || { firstName: "", lastName: "" },
            author: project.author || { firstName: "", lastName: "", email: "", website: "" },
            title: project.title || "",
            wordCount: project.wordCount || 0,
            genre: project.genre || ""
        });

        setQueryDraft(newQuery);
    }

    // handle delete
    const handleDelete = () => {
        if (!project) return;

        const savedProjects = JSON.parse(localStorage.getItem("projects")) || [];
        const updatedProjects = savedProjects.filter(p => p.id !== project.id);
        localStorage.setItem("projects", JSON.stringify(updatedProjects));

        navigate("/projects");
    }

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
                        <button onClick={handleEdit}>Edit Query</button>
                        <button onClick={handleSave}>Save</button>
                        <button onClick={handleDelete}>Delete Project</button>
                        <button onClick={openModal}>Submit Query</button>
                    </section>

                    {/* Center: Editable Document */}
                    <section className="project-editor-panel">
                        <h2>Editable Document</h2>
                        <div className="project-editor">
                            <label htmlFor="queryTemplate">Select Query Template:</label>
                            <select
                                id="queryTemplate"
                                value={selectedTemplateId}
                                onChange={(e) => setSelectedTemplateId(e.target.value)}
                            >
                                {/* map templates */}
                                {queryTemplates.map((template) => (
                                    <option key={template.id} value={template.id}>
                                        {template.name}
                                    </option>
                                ))}
                            </select>
                            <button type="button" className="regenerate-btn" onClick={handleRegenerateQuery}>
                                Regenerate Query
                            </button>

                            <textarea
                                value={queryDraft}
                                onChange={(e) => setQueryDraft(e.target.value)}
                                rows={15}
                                style={{ width: "100%" }}
                                readOnly={!isEditing}
                            />
                            {errors.queryDraft && <p className="error">{errors.queryDraft}</p>}
                        </div>
                    </section>

                    {/* Right: Project Info */}
                    <section className="project-info-panel">
                        <h2>Project Info</h2>

                        {/* Book Info */}
                        <div className="book-info">
                            <h3>Book Info</h3>

                            {isEditing ? (
                                <>
                                    <label htmlFor="title">Title:</label>
                                    <input
                                        id="title"
                                        type="text"
                                        value={project.title}
                                        onChange={(e) =>
                                            setProject((prev) => ({ ...prev, title: e.target.value }))
                                        }
                                    />
                                    {errors.title && <p className="error">{errors.title}</p>}

                                    <label htmlFor="genre">Genre:</label>
                                    <input
                                        id="genre"
                                        type="text"
                                        value={project.genre}
                                        onChange={(e) =>
                                            setProject((prev) => ({ ...prev, genre: e.target.value }))
                                        }
                                    />
                                    {errors.genre && <p className="error">{errors.genre}</p>}

                                    <label htmlFor="wordCount">Word Count:</label>
                                    <input
                                        id="wordCount"
                                        type="number"
                                        value={project.wordCount}
                                        onChange={(e) =>
                                            setProject((prev) => ({
                                                ...prev,
                                                wordCount: parseInt(e.target.value) || 0,
                                            }))
                                        }
                                    />
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

                        {/* Sample Size */}
                        <fieldset>
                            <legend>Sample Size</legend>
                            <div className="sample-size-select">
                                <label htmlFor="sampleSize">Select sample size:</label>
                                <select
                                    id="sampleSize"
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
                            </div>
                            {errors.sampleText && <p className="error">{errors.sampleText}</p>}

                            {selectedSize && parseInt(selectedSize) === project.sampleSize ? (
                                <div className="sample-text-entry">
                                    <label htmlFor="sampleText">Text for {selectedSize} pages:</label>
                                    <textarea
                                        id="sampleText"
                                        placeholder="Text for selected pages"
                                        value={sampleText}
                                        onChange={(e) => setSampleText(e.target.value)}
                                        rows={10}
                                    />
                                </div>
                            ) : selectedSize ? (
                                <>
                                    <label htmlFor="sampleText">Text for {selectedSize} pages:</label>
                                    <textarea
                                        id="sampleText"
                                        placeholder="Enter text for selected pages"
                                        value={sampleText}
                                        onChange={(e) => setSampleText(e.target.value)}
                                        rows={10}
                                        readOnly={!isEditing}
                                    />
                                </>
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



// TODO: clickable author/agent
// TODO: make copy buttons work