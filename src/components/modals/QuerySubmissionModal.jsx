import React from "react";

export default function QuerySubmissionModal({ isOpen, onClose, project }) {
    if (!isOpen) return null;

    // pull author from project
    const author = project?.author || {};

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
                                <input id="fname" type="text" value={author.firstName} readOnly />
                                <button type="button" className="copy-btn">Copy</button>
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="lname">Last Name</label>
                            <div className="input-with-copy">
                                <input id="lname" type="text" value={author.lastName} readOnly />
                                <button type="button" className="copy-btn">Copy</button>
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <div className="input-with-copy">
                                <input id="email" type="email" value={author.email} readOnly />
                                <button type="button" className="copy-btn">Copy</button>
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="website">Website</label>
                            <div className="input-with-copy">
                                <input id="website" type="text" value={author.website} readOnly />
                                <button type="button" className="copy-btn">Copy</button>
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="twitter">Twitter</label>
                            <div className="input-with-copy">
                                <input id="twitter" type="text" value={author.twitter} readOnly />
                                <button type="button" className="copy-btn">Copy</button>
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="instagram">Instagram</label>
                            <div className="input-with-copy">
                                <input id="instagram" type="text" value={author.instagram} readOnly/>
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
                                <input id="title" type="text" value={project.title || ""} readOnly />
                                <button type="button" className="copy-btn">Copy</button>
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="words">Word Count</label>
                            <div className="input-with-copy">
                                <input id="words" type="text" value={project.wordcount || ""} readOnly />
                                <button type="button" className="copy-btn">Copy</button>
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="genre">Genre</label>
                            <div className="input-with-copy">
                                <input id="genre" type="text" value={project.genre || ""} readOnly />
                                <button type="button" className="copy-btn">Copy</button>
                            </div>
                        </div>

                        {/* TODO: Add logic to link to notifcations */}
                        <div className="form-group">
                            <label htmlFor="expectedReply">Expected Reply By</label>
                            <input id="expectedReply" type="date" />
                        </div>

                        <div className="form-group">
                            <label>Query Draft</label>
                            <div className="final-query">
                                <p>{project?.querydraft || "Final query will go here."}</p>
                            </div>
                        </div>

                        {/* sample size dropdown */}
                        <div className="form-group">
                            <label htmlFor="sampleSize">Sample Size</label>
                            <select value={project?.samplesize || ""}>
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
                                <textarea
                                    id="sample"
                                    placeholder="Populate sample here"
                                    value={project?.sample || ""}
                                ></textarea>
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