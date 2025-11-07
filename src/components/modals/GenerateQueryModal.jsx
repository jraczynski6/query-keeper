export default function GenerateQueryModal({ isOpen, onClose, project }) {
    if (!isOpen) return null;
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Generate a Query</h2>


                <button
                    className="modal-close"
                    onClick={onClose}
                >
                    X</button>


                <form className="generate-query-form">
                    {/* Author selection */}
                    <label>
                        Author:
                        <select>
                            <option>Select an author</option>
                        </select>
                    </label>

                    {/* Agent Selection */}
                    <label>
                        Agent:
                        <select>
                            <option>Select an agent</option>
                        </select>
                    </label>

                    {/* Query Template */}
                    <label>
                        Query Template:
                        <select>
                            <option>Select a template</option>
                        </select>
                    </label>

                    {/* Book Info Section */}
                    <fieldset>
                        <legend>Books Info</legend>

                        <label>
                            Title:
                            <input type="text" placeholder="Enter book title" defaultValue={project?.title || ""} required />
                        </label>

                        <label>
                            Word Count:
                            <input type="number" placeholder="Enter word count" defaultValue={project?.wordcount || ""} required />
                        </label>

                        <label>
                            Genre:
                            <select defaultValue={project?.genre || ""}>
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
                            <select>
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
                            <textarea placeholder="Enter text for selected pages" />
                        </label>
                    </fieldset>

                    <button type="submit">Generate</button>
                    <button type="button">Cancel</button>
                </form>
            </div>
        </div>
    )
}