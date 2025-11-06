export default function GenerateQueryModal() {
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Generate a Query</h2>
                <button className="modal-close">X</button>
                <form className="generate-query-form">
                    <label>
                        Author:
                        <select>
                            <option>Select an author</option>
                        </select>
                    </label>

                    <label>
                        Agent:
                        <select>
                            <option>Select an agent</option>
                        </select>
                    </label>

                    <label>
                        Query Template:
                        <select>
                            <option>Select a template</option>
                        </select>
                    </label>

                    <button type="submit">Generate</button>
                    <button type="button">Cancel</button>
                </form>
            </div>
        </div>
    )
}