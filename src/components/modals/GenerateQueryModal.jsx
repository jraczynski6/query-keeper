import React, { useState, useEffect } from "react";
import queryTemplates from "../../utils/queryTemplates";
import { generateQuery } from "../../utils/queryGenerationUtils";
import { useNavigate } from "react-router-dom";





export default function GenerateQueryModal({ isOpen, onClose, project, onProjectCreated }) {
    if (!isOpen) return null;

    // state to track selected author and agent.
    const [author, setAuthor] = useState(null);
    const [agents, setAgents] = useState([]);
    const [selectedAuthorId, setSelectedAuthorId] = useState("");
    const [selectedAgentId, setSelectedAgentId] = useState("");

    // state to track book info
    const [title, setTitle] = useState(project?.title || "");
    const [wordCount, setWordCount] = useState(project?.wordCount || "");
    const [genre, setGenre] = useState(project?.genre || "");
    const [sampleSize, setSampleSize] = useState("");
    const [sampleText, setSampleText] = useState("");
    const [selectedTemplateId, setSelectedTemplateId] = useState("");
    const [generatedQuery, setGeneratedQuery] = useState("");

    // must use hooks before function calls.
    const navigate = useNavigate();


    const handleTemplateChange = (e) => {
        setSelectedTemplateId(e.target.value);
    }

    // effect to pull from local storage on modal open.
    useEffect(() => {
        const storedAuthor = JSON.parse(localStorage.getItem("author")) || null;
        const storedAgents = JSON.parse(localStorage.getItem("agents")) || [];

        setAuthor(storedAuthor);
        setAgents(storedAgents);
    }, []);


    // handleSubmit
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!author || !selectedAgentId || !selectedTemplateId) return;

        const agent = agents.find(agent => agent.id === parseInt(selectedAgentId));


        const generatedText = generateQuery({
            templateId: selectedTemplateId,
            author,
            agent,
            title,
            wordCount,
            genre,
        });

        // create project
        let nextProjectId = parseInt(localStorage.getItem("nextProjectId") || "1");
        const newProject = {
            id: nextProjectId,
            title,
            wordCount,
            genre,
            author,
            agent,
            templateId: selectedTemplateId,
            query: generatedText,
        };
        // update nextProjectId
        localStorage.setItem("nextProjectId", (nextProjectId + 1).toString());

        // save project
        const savedProjects = JSON.parse(localStorage.getItem("projects")) || [];
        savedProjects.push(newProject);
        localStorage.setItem("projects", JSON.stringify(savedProjects));

        if (typeof onProjectCreated === "function") {
            onProjectCreated(newProject);
        }

        onClose();
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Generate a Query</h2>


                <button
                    className="modal-close"
                    onClick={onClose}
                >
                    X</button>


                <form className="generate-query-form" onSubmit={handleSubmit}>
                    {/* TODO: Update Select to accept locally stored arrays */}
                    {/* Author selection */}
                    <label>
                        Author:
                        <input
                            type="text"
                            // cannot place object directly in JSX Value
                            value={
                                author
                                    ? `${author.firstName || ""} ${author.lastName || ""}`
                                    : "No author found"
                            } readOnly />

                    </label>

                    {/* Agent Selection */}
                    <label>
                        {/* TODO: Add logic for no agent saved */}
                        Agent:
                        <select
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
                    </label>

                    {/* Query Template */}
                    <label>
                        Query Template:
                        <select
                            value={selectedTemplateId}
                            onChange={handleTemplateChange}
                            required
                        >
                            <option value="">Select a template</option>
                            {queryTemplates.map((template) => (
                                <option key={template.id} value={template.id}>
                                    {template.name}
                                </option>
                            ))}
                        </select>
                    </label>

                    {/* Book Info Section */}
                    <fieldset>
                        <legend>Books Info</legend>

                        <label>
                            Title:
                            <input
                                type="text"
                                placeholder="Enter book title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </label>

                        <label>
                            Word Count:
                            <input
                                type="number"
                                placeholder="Enter word count"
                                value={wordCount}
                                onChange={(e) => setWordCount(e.target.value)}
                                required
                            />
                        </label>

                        <label>
                            Genre:
                            <select
                                value={genre}
                                onChange={(e) => setGenre(e.target.value)}
                            >
                                <option value={"nonfiction"}>Nonfiction</option>
                                <option value={"fantasy"}>Fantasy</option>
                                <option value={"Sci-fi"}>Sci-fi</option>
                                <option value={"mystery"}>Mystery</option>
                                <option value={"horror"}>Horror</option>
                                <option value={"dystopian"}>Dystopian</option>
                                <option value={"nonfiction"}>Nonfiction</option>
                                <option value={"literaryfiction"}>Literary Fiction</option>
                                <option value={"thriller"}>Thriller</option>
                                <option value={"other"}>Other</option>
                            </select>
                        </label>

                        {/* TODO: Add handleGenreChange logic and custom genre input */}
                        <label id="customGenreLabel" style={{ display: "none" }}>
                            Enter Genre:
                            <input type="text" id="customGenre" placeholder="Enter genre" />
                        </label>
                    </fieldset>

                    {/* Sample Size Section */}
                    <fieldset>
                        <legend>Sample Size</legend>

                        <label>
                            Select sample size:
                            <select
                                value={sampleSize}
                                onChange={(e) => setSampleSize(e.target.value)}
                            >
                                <option value={""}>Select...</option>
                                <option value={"3"}>3 Pages</option>
                                <option value={"5"}>5 Pages</option>
                                <option value={"10"}>10 Pages</option>
                                <option value={"30"}>30 Pages</option>
                                <option value={"50"}>50 Pages</option>
                            </select>
                        </label>

                        {/* TODO: Show text area only when size selected */}
                        <label>
                            Enter text for selected page size:
                            <textarea
                                value={sampleText}
                                onChange={(e) => setSampleText(e.target.value)}
                                placeholder="Enter text for selected pages" />
                        </label>
                    </fieldset>

                    <button type="submit">Generate</button>
                    <button type="button" onClick={onClose}>Cancel</button>
                </form>
            </div>
        </div>
    )
}
// Query generation TODOs
// TODO: Track form inputs with state
// TODO: handle generation of Query / add onSubmit to form
// TODO: Store created projects
// TODO: Add more query templates. min 5