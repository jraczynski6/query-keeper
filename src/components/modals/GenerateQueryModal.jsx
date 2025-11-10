import React, { useState, useEffect } from "react";
import queryTemplates from "../../utils/queryTemplates";
import { generateQuery } from "../../utils/queryGenerationUtils";
import { useNavigate } from "react-router-dom";





export default function GenerateQueryModal({ isOpen, onClose, project, onProjectCreated }) {

    //fallback
    if (!isOpen) return null;


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
    const [sampleText, setSampleText] = useState(project?.sampleText ||"");

    //track selected template
    const [selectedTemplateId, setSelectedTemplateId] = useState("");
    // store generated query
    const [generatedQuery, setGeneratedQuery] = useState("");

    // 
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


    // handleSubmit form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        //fallback
        if (!author || !selectedAgentId || !selectedTemplateId) return;

        //find selected agent
        const agent = agents.find(agent => agent.id === parseInt(selectedAgentId));

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
            id: nextProjectId,
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
        // update nextProjectId
        // TODO: change to timestamp
        localStorage.setItem("nextProjectId", (nextProjectId + 1).toString());

        // save project
        const savedProjects = JSON.parse(localStorage.getItem("projects")) || [];
        savedProjects.push(newProject);
        localStorage.setItem("projects", JSON.stringify(savedProjects));

        // new project created.
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
                            Sample size - Pages:
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

                        <label>
                            Enter text for selected page size:
                            <textarea
                                value={sampleText}
                                onChange={(e) => setSampleText(e.target.value)}
                                placeholder="Enter text for selected pages"
                                rows={8}
                                />
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
// TODO: Add more query templates. min 5