import NavMenu from "../components/NavMenu/NavMenu";
import Header from "../components/Header";
import Footer from "../components/footer";

export default function Projects() {
    return (
        <div className="projects-page">
            <Header />
            <NavMenu />

            <main className="projects-content">
                <h1>Projects</h1>
                <p>This is the projects page. Content will go here. :P</p>
                {/* TODO: Add dummy placeholders for projects. use object and map */}

                <div className="project-actions">
                    {/* TODO: Add handleNewProject on click logic */}
                <button>New Project</button>
                </div>
            </main>
            <Footer />
        </div>
    )
}