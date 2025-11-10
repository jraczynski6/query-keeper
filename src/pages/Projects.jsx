import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProjectCard from "../components/ProjectCard";
import GenerateQueryModal from "../components/modals/GenerateQueryModal";
import { useDashboard } from "../contexts/DashboardContext";

export default function Projects() {
    const navigate = useNavigate();
    const { pinItem } = useDashboard();
    // Mock data project object
    const [projects, setProjects] = useState([
        {
            id: 1,
            title: "Best Novel Ever",
            wordCount: 95000,
            genre: "Fantasy",
            query: `Dear Jane Doe,
I am pleased to submit my manuscript titled "Best Novel Ever", approximately 5000 words, in the fantasy genre. This work represents a story I have carefully developed, and I believe it aligns with your interests.

As the author, I am available for any additional materials or clarifications you may require. My contact details are listed below:

Author: John Smith  
Email: johnsmith@email.com  
Website: https://johnsmith.com

Thank you for considering my submission. I would be thrilled to discuss the manuscript further and explore the possibility of working together.

Sincerely,  
John Smith`,
            sampleSize: 3,
            sampleText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ac eros sed lorem porta consequat. Phasellus sed sapien nec justo tincidunt tincidunt. In ut consequat magna, et dictum urna. Cras convallis sem nec ultricies laoreet. Suspendisse suscipit, odio nec iaculis porta, velit magna fermentum erat, sit amet vulputate elit nibh non ante. Morbi luctus, justo non ultrices porttitor, turpis metus rhoncus metus, vitae ultrices lorem lorem non elit. Curabitur dignissim posuere justo nec maximus. Aliquam et diam arcu. In hac habitasse platea dictumst. Integer et nisl odio. Maecenas bibendum justo sed quam interdum pretium.",
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

    //generate modal visibility
    const [showGenerate, setShowGenerate] = useState(false);
    const openGenerate = () => setShowGenerate(true);
    const closeGenerate = () => setShowGenerate(false);

    // edit and submit placeholder
    const [modalOpen, setModalOpen] = useState(false);
    const [modalProject, setModalProject] = useState(null);

    // selected project state for navigation
    const [selectedProject, setSelectedProject] = useState(null);

    //handlePin logic
    const handlePin = (project) => {
        pinItem({
            id: project.id,
            type: "project",
            projectName: project.title,
            link: `/projects/${project.id}`,
        });
    };

    // sync localStorage on state change
    useEffect(() => {
        localStorage.setItem("projects", JSON.stringify(projects));
    }, [projects]);

    return (
        <div className="projects-page">

            <main className="projects-content">
                <h1>Projects</h1>

                <button
                    className="generate-query-btn"
                    onClick={openGenerate}
                >
                    Generate Query
                </button>

                {/* display project Cards */}
                <div className="projects-list-panel">
                    {projects.map((project) => (
                        <ProjectCard
                            key={project.id}
                            project={project}
                            agent={project.agent}
                            isSelected={selectedProject?.id === project.id}
                            onSelect={() => setSelectedProject(project)}
                            onPin={() => handlePin(project)}
                        />
                    ))}
                </div>

                {/* conditional render for selected project navigation */}
                {selectedProject && (
                    <button
                        className="go-to-project-btn"
                        onClick={() =>
                            navigate(`/projects/${selectedProject.id}`, {
                                state: { project: selectedProject } //pass project state
                            })
                        }
                    >
                        View Project
                    </button>
                )}

                {/* Generate Query Modal */}
                <GenerateQueryModal
                    isOpen={showGenerate}
                    onClose={closeGenerate}
                    onProjectCreated={(newProject) => {
                        // Add the newly generated project to projects list
                        setProjects(prev => [...prev, newProject]);
                    }}
                />
            </main>
        </div>
    )
}