import React from "react";

export default function QuerySubmissionModal({isOpen, onClose, project}) {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="close-button" onClick={onClose}>X</button>
                <h2>Submit a query</h2>
                <p>Submitting for: {project.title}</p>

                <form className="query-form">
                    {/* Author Specific Section */}
                    <section className="form-section">
                        <h3>Author Specific</h3>

                        <div className="form-group">
                            <label htmlFor="fname">First Name</label>
                            <div className="input-with-copy">
                                <input id="fname" type="text" required />
                                <button type="button" className="copy-btn">Copy</button>
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="lname">Last Name</label>
                            <div className="input-with-copy">
                                <input id="lname" type="text" required />
                                <button type="button" className="copy-btn">Copy</button>
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <div className="input-with-copy">
                                <input id="email" type="email" required />
                                <button type="button" className="copy-btn">Copy</button>
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="website">Website</label>
                            <div className="input-with-copy">
                                <input id="website" type="text" />
                                <button type="button" className="copy-btn">Copy</button>
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="twitter">Twitter</label>
                            <div className="input-with-copy">
                                <input id="twitter" type="text" />
                                <button type="button" className="copy-btn">Copy</button>
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="instagram">Instagram</label>
                            <div className="input-with-copy">
                                <input id="instagram" type="text" />
                                <button type="button" className="copy-btn">Copy</button>
                            </div>
                        </div>
                    </section>

                    {/* Project Specific */}
                    <section className="form-section">
                        <h3>Project Specific</h3>

                        <div className="form-group">
                            <label htmlFor="title">Title</label>
                            <div className="input-with-copy">
                                <input id="title" type="text" required />
                                <button type="button" className="copy-btn">Copy</button>
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="words">Word Count</label>
                            <div className="input-with-copy">
                                <input id="words" type="text" required />
                                <button type="button" className="copy-btn">Copy</button>
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="genre">Genre</label>
                            <div className="input-with-copy">
                                <input id="genre" type="text" required />
                                <button type="button" className="copy-btn">Copy</button>
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="expectedReply">Expected Reply By</label>
                            <input id="expectedReply" type="date" required />
                        </div>

                        <div className="form-group">
                            <label>Query Draft</label>
                            <div className="final-query">
                                <p>Final query will go here.</p>
                            </div>
                        </div>

                        {/* sample size dropdown */}
                        <div className="form-group">
                            <label htmlFor="sampleSize">Sample Size</label>
                            <select>
                                <option value={""}>Select sample size</option>
                                <option value={"3"}>3 Pages</option>
                                <option value={"5"}>5 Pages</option>
                                <option value={"10"}>10 Pages</option>
                                <option value={"30"}>30 Pages</option>
                                <option value={"50"}>50 Pages</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="sample">Sample</label>
                            <div className="input-with-copy">
                                <textarea id="sample" placeholder="Populate sample here"></textarea>
                                <button type="button" className="copy-btn">Copy</button>
                            </div>
                        </div>
                    </section>

                    {/* Form Actions */}
                    <div className="form-actions">
                        <button type="button" className="cancel-btn">Cancel</button>
                        <button type="submit" className="submit-btn">Submit Query</button>
                    </div>

                </form>
            </div>
        </div >
    )
}