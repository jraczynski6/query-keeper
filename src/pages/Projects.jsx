import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProjectCard from "../components/ProjectCard";
import GenerateQueryModal from "../components/modals/GenerateQueryModal";

export default function Projects() {
    const navigate = useNavigate();

    // Sample project Array
    const [projects, setProjects] = useState([
        {
            id: 1,
            title: "Best Novel Ever",
            wordcount: 95000,
            genre: "Fantasy",
            agent: {
                id: 1,
                firstName: "Jane",
                lastName: "Doe",
                agency: "Best Agent Agency",
                email: "janedoe@email.com",
                website: "janedoeagent.com",
                twitter: "@janedoe",
                instagram: "@janedoe_",
                notes: "This agent is prefers fantasy"
            },
            author: {
                firstName: "John",
                lastName: "Smith",
                email: "johnsmith@email.com",
                website: "https://johnsmith.com",
                twitter: "@johnsmith",
                instagram: "@johnsmith_"
            }
        }
    ]);

    const [modalOpen, setModalOpen] = useState(false);
    const [modalProject, setModalProject] = useState(null);
    const [selectedProject, setSelectedProject] = useState(null);

    return (
        <div className="projects-page">

            <main className="projects-content">
                <h1>Projects</h1>

                {/* Generate Query button (separate from mapped projects) */}
                <button
                    className="generate-query-btn"
                    onClick={() => setModalOpen(true)}
                >
                    Generate Query
                </button>

                <div className="projects-list-panel">
                    {projects.map((project) => (
                        <ProjectCard
                            key={project.id}
                            {...project}
                            onSelect={() => setSelectedProject(project)}
                        />
                    ))}
                </div>


                {selectedProject && (
                    <button
                        className="go-to-project-btn"
                        onClick={() =>
                            navigate(`/projects/${selectedProject.id}`, {
                                state: { project: selectedProject }
                            })
                        }
                    >
                        View Project
                    </button>
                )}

                {/* Generate Query Modal */}
                <GenerateQueryModal
                    isOpen={modalOpen}
                    onClose={() => setModalOpen(false)}
                />
            </main>
        </div>
    )
}