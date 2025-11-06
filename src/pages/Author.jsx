import NavMenu from "../components/NavMenu/NavMenu";
import Header from "../components/Header";
import Footer from "../components/footer";

export default function Author() {
    return (
        <div className="author-page">
            <Header />
            <NavMenu />
            <main className="author-conent">
                <div className="split-container">


                    {/* Left: Author Form */}
                    <section className="author-form-panel">
                        <h2>Author Information</h2>
                        <form>
                            <label>
                                First Name:
                                <input type="text" placeholder="Enter author's first name" required />
                            </label>

                            <label>
                                Last Name:
                                <input type="text" placeholder="Enter author's last name" required />
                            </label>

                            <label>
                                Email:
                                <input type="email" placeholder="Enter author's email" required />
                            </label>

                            <label>
                                Website:
                                <input type="url" placeholder="Enter author's website" />
                            </label>

                            <label>
                                Twitter:
                                <input type="text" placeholder="Enter twitter handle" />
                            </label>

                            <label>
                                Instagram:
                                <input type="text" placeholder="Enter instagram handle" />
                            </label>

                            <button type="submit" className="save-btn">Save Author</button>
                        </form>
                    </section>

                    <section className="author-preview">
                        <h2>Sample Project Preview</h2>

                        <div className="preview-card">
                            <h3 class="author-name">Author Name</h3>
                            <p class="author-email">email@example.com</p>
                            <p class="author-links">
                                <span>Website:</span>
                                <span>Twitter: @handle</span>
                                <span>Instagram: @handle</span>
                            </p>

                            <div className="sample-project">
                                <h4>Project Title</h4>
                                <p>Sample submission card that populates using the author info.</p>
                            </div>
                        </div>
                    </section>


                </div>
            </main>
            <Footer />
        </div>
    )
}