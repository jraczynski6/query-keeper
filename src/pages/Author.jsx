import { useState, useEffect } from "react";
import "./Author.css";

export default function Author() {
    // Mock Author data
    const [author, setAuthor] = useState(() => {
        const saved = localStorage.getItem("author");
        if (saved) return JSON.parse(saved);

        return {
            firstName: "John",
            lastName: "Smith",
            email: "johnsmith@email.com",
            website: "https://johnsmith.com",
            twitter: "@johnsmith",
            instagram: "@johnsmith_",
        };
    });

    const [errors, setErrors] = useState({});

    const validateAuthor = () => {
        const newErrors = {};

        if (!author.firstName.trim()) newErrors.firstName = "First name is required.";
        if (!author.lastName.trim()) newErrors.lastName = "Last name is required.";

        if (!author.email.trim()) {
            newErrors.email = "Email is required.";
        } else if (!author.email.includes("@") || !author.email.includes(".")) {
            newErrors.email = "Please use a valid email address.";
        }

        if (author.website && !(author.website.startsWith("http://") || author.website.startsWith("https://"))) {
            newErrors.website = "Website must start with http:// or https://";
        }

        if (author.twitter && !author.twitter.startsWith("@")) {
            newErrors.twitter = "Twitter handle must start with @";
        }

        if (author.instagram && !author.instagram.startsWith("@")) {
            newErrors.instagram = "Instagram handle must start with @";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Save to local storage on update
    useEffect(() => {
        localStorage.setItem("author", JSON.stringify(author));
    }, [author]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateAuthor()) return;

        // TODO: Add toast for author info saved
    };

    return (
        <div className="author-page">
            <main className="author-content">
                <div className="split-container">

                    {/* Left: Author Form */}
                    <section className="author-form-panel">
                        <h2>Author Information</h2>
                        <form onSubmit={handleSubmit}>

                            <label>First Name:</label>
                            <input
                                type="text"
                                placeholder="Enter author's first name"
                                value={author.firstName}
                                onChange={(e) => setAuthor({ ...author, firstName: e.target.value })}
                            />
                            {errors.firstName && <p className="error-text">{errors.firstName}</p>}

                            <label>Last Name:</label>
                            <input
                                type="text"
                                placeholder="Enter author's last name"
                                value={author.lastName}
                                onChange={(e) => setAuthor({ ...author, lastName: e.target.value })}
                            />
                            {errors.lastName && <p className="error-text">{errors.lastName}</p>}

                            <label>Email:</label>
                            <input
                                type="email"
                                placeholder="Enter author's email"
                                value={author.email}
                                onChange={(e) => setAuthor({ ...author, email: e.target.value })}
                            />
                            {errors.email && <p className="error-text">{errors.email}</p>}

                            <label>Website:</label>
                            <input
                                type="url"
                                placeholder="Enter author's website"
                                value={author.website}
                                onChange={(e) => setAuthor({ ...author, website: e.target.value })}
                            />
                            {errors.website && <p className="error-text">{errors.website}</p>}

                            <label>Twitter:</label>
                            <input
                                type="text"
                                placeholder="Enter twitter handle"
                                value={author.twitter}
                                onChange={(e) => setAuthor({ ...author, twitter: e.target.value })}
                            />
                            {errors.twitter && <p className="error-text">{errors.twitter}</p>}

                            <label>Instagram:</label>
                            <input
                                type="text"
                                placeholder="Enter instagram handle"
                                value={author.instagram}
                                onChange={(e) => setAuthor({ ...author, instagram: e.target.value })}
                            />
                            {errors.instagram && <p className="error-text">{errors.instagram}</p>}

                            <button type="submit" className="save-btn">Save Author</button>
                        </form>
                    </section>

                    {/* Right: Author Preview */}
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
    );
}
