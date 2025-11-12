import { useState, useEffect } from "react"
import "./Author.css"

export default function Author() {

    // Mock Author data
    const [author, setAuthor] = useState(() => {
        // check local storage
        const saved = localStorage.getItem("author");
        if (saved) {
            // convert string to object
            return JSON.parse(saved);
        }
        
        // default author data
        return {
            firstName: "John",
            lastName: "Smith",
            email: "johnsmith@email.com",
            website: "https://johnsmith.com",
            twitter: "@johnsmith",
            instagram: "@johnsmith_"
        };
        });
        
        // Save to local storage on update
        useEffect(() => {
            localStorage.setItem("author", JSON.stringify(author));
        }, [author]);

        // form submission 
        const handleSubmit = (e) => {
            e.preventDefault();
            // TODO: Add toast for author info saved
        }


    return (
        <div className="author-page">

            <main className="author-content">
                <div className="split-container">


                    {/* Left: Author Form */}
                    <section className="author-form-panel">
                        <h2>Author Information</h2>
                        <form onSubmit={handleSubmit}>
                            <label>
                                First Name:
                                <input
                                    type="text"
                                    placeholder="Enter author's first name"
                                    value={author.firstName}
                                    onChange={(e) => setAuthor({ ...author, firstName: e.target.value })} // copy author, replace firstName
                                />
                            </label>

                            <label>
                                Last Name:
                                <input
                                    type="text"
                                    placeholder="Enter author's last name"
                                    value={author.lastName}
                                    onChange={(e) => setAuthor({ ...author, lastName: e.target.value })}
                                />
                            </label>

                            <label>
                                Email:
                                <input
                                    type="email"
                                    placeholder="Enter author's email"
                                    value={author.email}
                                    onChange={(e) => setAuthor({ ...author, email: e.target.value })}
                                />
                            </label>

                            <label>
                                Website:
                                <input
                                    type="url"
                                    placeholder="Enter author's website"
                                    value={author.website}
                                    onChange={(e) => setAuthor({ ...author, website: e.target.value })}
                                />
                            </label>

                            <label>
                                Twitter:
                                <input
                                    type="text"
                                    placeholder="Enter twitter handle"
                                    value={author.twitter}
                                    onChange={(e) => setAuthor({ ...author, twitter: e.target.value })}
                                />
                            </label>

                            <label>
                                Instagram:
                                <input
                                    type="text"
                                    placeholder="Enter instagram handle"
                                    value={author.instagram}
                                    onChange={(e) => setAuthor({ ...author, instagram: e.target.value })}
                                />
                            </label>

                            <button type="submit" className="save-btn">Save Author</button>
                        </form>
                    </section>

                    <section className="author-preview">
                        <h2>Sample Project Preview</h2>

                        <div className="preview-card">
                            <h3 className="author-name">{author.firstName} {author.lastName}</h3>
                            <p className="author-email">{author.email}</p>
                            <p className="author-links">
                                <span>Website: {author.website}</span>
                                <span>Twitter: {author.twitter}</span>
                                <span>Instagram: {author.instagram}</span>
                            </p>

                            <div className="sample-project">
                                <h4>Project Title</h4>
                                <p>Sample submission card that populates using the author info.</p>
                            </div>
                        </div>
                    </section>


                </div>
            </main>
        </div>
    )
}


// TODO: Add input validation
// TODO: Add reset button
// TODO: accessibility check
