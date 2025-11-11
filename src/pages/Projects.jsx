import { useEffect, useState } from "react";
import ProjectCard from "../components/ProjectCard";
import GenerateQueryModal from "../components/modals/GenerateQueryModal";
import { useDashboard } from "../contexts/DashboardContext";
import { Link } from "react-router-dom";
import "./Projects.css";

export default function Projects() {

    // for pinItem
    const { pinItem } = useDashboard();

    // Mock data project object
    const [projects, setProjects] = useState(() => {

        //read mock data
        const savedProjects = localStorage.getItem("projects");
        if (savedProjects) return JSON.parse(savedProjects);

        //default 
        const defaultProject = {
            id: crypto.randomUUID(),
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
                id: crypto.randomUUID(),
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
                id: crypto.randomUUID(),
                firstName: "John",
                lastName: "Smith",
                email: "johnsmith@email.com",
                website: "https://johnsmith.com",
                twitter: "@johnsmith",
                instagram: "@johnsmith_"
            }
        };

        localStorage.setItem("projects", JSON.stringify([defaultProject]));
        return [defaultProject];
    });

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
            id: `project-${project.id}`,
            type: "project",
            projectData: project,      // store the full project object
            link: `/projects/${project.id}`,
            state: { project },
            position: { x: 50, y: 50 }
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

                <div className="button-wrapper">
                    <button
                        className="generate-query-btn"
                        onClick={openGenerate}
                    >
                        Generate Query
                    </button>
                </div>

                {/* Project cards container */}
                <div className="project-cards-container">
                    {projects.map(project => (
                        <div key={project.id} className="project-card-wrapper">
                            <ProjectCard
                                project={project}
                                agent={project.agent}
                                isSelected={selectedProject?.id === project.id}
                                onSelect={() => setSelectedProject(project)}
                                onPin={() => handlePin(project)}
                            />
                        </div>
                    ))}
                </div>

                {/* Bottom-centered View Project button */}
                {selectedProject && (
                    <div className="view-project-container">
                        <Link
                            to={`/projects/${selectedProject.id}`}
                            className="view-project-btn"
                        >
                            View Project
                        </Link>
                    </div>
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