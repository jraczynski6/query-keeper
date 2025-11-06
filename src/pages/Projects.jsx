import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProjectCard from "../components/ProjectCard";

export default function Projects() {
    const navigate = useNavigate();

    // Sample project Array
    const [projects, setProjects] = useState([
        {
            id: 1,
            title: "Best Novel Ever",
            wordcount: 95000,
            genre: "Fantasy"
        }
    ]);

    const [selectedProject, setSelectedProject] = useState(null);

    return (
        <div className="projects-page">

            <main className="projects-content">
                <h1>Projects</h1>

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
            </main>

        </div>
    )
}