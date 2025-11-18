import React, { useState, useEffect } from "react";
import queryTemplates from "../../utils/queryTemplates";
import { generateQuery } from "../../utils/queryGenerationUtils";
import { useNavigate } from "react-router-dom";
import "./GenerateQueryModal.css";
import { useNotifications } from "../../contexts/NotificationsContext";





export default function GenerateQueryModal({ isOpen, onClose, project, onProjectCreated }) {

    //fallback
    if (!isOpen) return null;

    const { addToast } = useNotifications();

    // State Hooks

    // track author
    const [author, setAuthor] = useState(null);
    // track agents
    const [agents, setAgents] = useState([]);

    // track selected agent and author
    const [selectedAuthorId, setSelectedAuthorId] = useState("");
    const [selectedAgentId, setSelectedAgentId] = useState("");

    // state to track book info
    const [title, setTitle] = useState(project?.title || "");
    const [wordCount, setWordCount] = useState(project?.wordCount || "");
    const [genre, setGenre] = useState(project?.genre || "");
    const [sampleSize, setSampleSize] = useState(project?.sampleSize?.toString() || "");
    const [sampleText, setSampleText] = useState(project?.sampleText || "");

    //track selected template
    const [selectedTemplateId, setSelectedTemplateId] = useState("");
    // store generated query
    const [generatedQuery, setGeneratedQuery] = useState("");

    // errors state
    const [errors, setErrors] = useState({});

    // must use hooks before function calls.
    const navigate = useNavigate();

    // template change
    const handleTemplateChange = (e) => {
        setSelectedTemplateId(e.target.value);
    }

    // load author and agents when modal opens
    useEffect(() => {
        const storedAuthor = JSON.parse(localStorage.getItem("author")) || null;
        const storedAgents = JSON.parse(localStorage.getItem("agents")) || [];

        setAuthor(storedAuthor);
        setAgents(storedAgents);
    }, []);

    //live validation
    useEffect(() => {
        if (Object.keys(errors).length === 0) return;

        const updatedErrors = { ...errors };


        // Clear agent error
        if (selectedAgentId && updatedErrors.agent) delete updatedErrors.agent;

        // Clear template error
        if (selectedTemplateId && updatedErrors.template) delete updatedErrors.template;

        // Clear title error
        if (title.trim() && updatedErrors.title) delete updatedErrors.title;

        // Clear wordCount error
        if (wordCount && Number(wordCount) > 0 && updatedErrors.wordCount) delete updatedErrors.wordCount;

        setErrors(updatedErrors);
    }, [selectedAgentId, selectedTemplateId, title, wordCount]);

    const validate = () => {
        const newErrors = {};

        if (!selectedAgentId) {
            newErrors.agent = "Please Select an agent.";
        }

        if (!selectedTemplateId) {
            newErrors.template = "Please select a query template";
        }

        if (!title.trim()) {
            newErrors.title = "Title is required.";
        }

        if (!wordCount || Number(wordCount) <= 0) {
            newErrors.wordCount = "Please enter a valid wordcount."
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // handleSubmit form submission
    const handleSubmit = (e) => {
        e.preventDefault();


        //fallback
        if (!validate()) return;

        //find selected agent
        const agent = agents.find(agent => agent.id === selectedAgentId);

        // generate query using utils.
        const generatedText = generateQuery({
            templateId: selectedTemplateId,
            author,
            agent,
            title,
            wordCount,
            genre,
        });

        // create project
        const newProject = {
            id: crypto.randomUUID(),
            title,
            wordCount,
            genre,
            author,
            agent,
            templateId: selectedTemplateId,
            query: generatedText,
            sampleSize: Number(sampleSize),
            sampleText: sampleText,
        };

        // save project
        const savedProjects = JSON.parse(localStorage.getItem("projects")) || [];
        savedProjects.push(newProject);
        localStorage.setItem("projects", JSON.stringify(savedProjects));

        // new project created.
        if (typeof onProjectCreated === "function") {
            onProjectCreated(newProject);
        }

        addToast("New project created!");

        onClose();
    };





    return (
        <div className="modal-overlay">
            <div className="generate-query-modal-content">
                <h2>Generate a Query</h2>


                <button
                    className="modal-close"
                    onClick={onClose}
                >
                    X</button>


                <form className="generate-query-form" onSubmit={handleSubmit}>
                    {/* Author selection */}
                    <label htmlFor="author">
                        Author:
                    </label>
                    <input
                        id="author"
                        type="text"
                        value={author ? `${author.firstName || ""} ${author.lastName || ""}` : "No author found"}
                        readOnly
                    />

                    {/* Agent Selection */}
                    <label htmlFor="agent">Agent:</label>
                    <select
                        id="agent"
                        value={selectedAgentId}
                        onChange={(e) => setSelectedAgentId(e.target.value)}
                    >
                        <option value="">Select an agent</option>
                        {agents.map((agent) => (
                            <option key={agent.id} value={agent.id}>
                                {agent.firstName} {agent.lastName}
                            </option>
                        ))}
                    </select>
                    {errors.agent && <p className="error-text">{errors.agent}</p>}

                    {/* Query Template */}
                    <label htmlFor="template">Query Template:</label>
                    <select
                        id="template"
                        value={selectedTemplateId}
                        onChange={handleTemplateChange}
                    >
                        <option value="">Select a template</option>
                        {queryTemplates.map((template) => (
                            <option key={template.id} value={template.id}>
                                {template.name}
                            </option>
                        ))}
                    </select>
                    {errors.template && <p className="error-text">{errors.template}</p>}

                    {/* Book Info Section */}
                    <fieldset>
                        <legend>Book Info</legend>

                        <label htmlFor="title">Title:</label>
                        <input
                            id="title"
                            type="text"
                            placeholder="Enter book title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        {errors.title && <p className="error-text">{errors.title}</p>}

                        <label htmlFor="wordCount">Word Count:</label>
                        <input
                            id="wordCount"
                            type="number"
                            placeholder="Enter word count"
                            value={wordCount}
                            onChange={(e) => setWordCount(e.target.value)}
                        />
                        {errors.wordCount && <p className="error-text">{errors.wordCount}</p>}

                        <label htmlFor="genre">Genre:</label>
                        <select
                            id="genre"
                            value={genre}
                            onChange={(e) => setGenre(e.target.value)}
                        >
                            <option value="nonfiction">Nonfiction</option>
                            <option value="fantasy">Fantasy</option>
                            <option value="Sci-fi">Sci-fi</option>
                            <option value="mystery">Mystery</option>
                            <option value="horror">Horror</option>
                            <option value="dystopian">Dystopian</option>
                            <option value="literaryfiction">Literary Fiction</option>
                            <option value="thriller">Thriller</option>
                            <option value="other">Other</option>
                        </select>

                        <label id="customGenreLabel" style={{ display: "none" }}>
                            Enter Genre:
                            <input type="text" id="customGenre" placeholder="Enter genre" />
                        </label>
                    </fieldset>

                    {/* Sample Size Section */}
                    <fieldset>
                        <legend>Sample Size</legend>

                        <label htmlFor="sampleSize">Sample size - Pages:</label>
                        <select
                            id="sampleSize"
                            value={sampleSize}
                            onChange={(e) => setSampleSize(e.target.value)}
                        >
                            <option value="">Select...</option>
                            <option value="3">3 Pages</option>
                            <option value="5">5 Pages</option>
                            <option value="10">10 Pages</option>
                            <option value="30">30 Pages</option>
                            <option value="50">50 Pages</option>
                        </select>

                        <label htmlFor="sampleText">Enter text for selected page size:</label>
                        <textarea
                            id="sampleText"
                            value={sampleText}
                            onChange={(e) => setSampleText(e.target.value)}
                            placeholder="Enter text for selected pages"
                            rows={8}
                        />
                    </fieldset>

                    <button type="submit">Generate</button>
                    <button type="button" onClick={onClose}>Cancel</button>
                </form>
            </div>
        </div>
    )
}
// Query generation ALL FORMS
// TODO: Add more query templates.
// TODO: Clear errors as user types
// TODO: auto-scroll to first error
// TODO: select first field to begin typing.