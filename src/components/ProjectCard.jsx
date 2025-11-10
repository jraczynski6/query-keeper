import React from "react";
import "../styles/ProjectCard.css";
import { Link } from "react-router-dom";
import { useDashboard } from "../contexts/DashboardContext";
import { useNavigate } from "react-router-dom";
import Projects from "../pages/Projects";

export default function ProjectCard({ project, id, onSelect, onPin, agent, isSelected }) {
    const { pinItem } = useDashboard();
    const navigate = useNavigate();
    const { title, wordCount, genre} = project; // destructure

    // go to page
    const goToPage = (e) => {
        e.stopPropagation();
        navigate(`/projects/${id}`);
    };

    const handleUnpin = (e) => {
        e.stopPropagation();
        unpinItem(item);
    };

    return (
        <div className="project-card" onClick={onSelect}>
            <h3 className="project-title">{title}</h3>
            <p className="project-wordcount">Wordcount:{wordCount}</p>
            <p className="project-genre">Genre: {genre}</p>

            {/* conditional render for agent */}
            {agent && (
                <p className="project-agent">
                    agent: {agent.firstName} {agent.lastName}
                </p>
            )}

            {isSelected && (
                <button className="pin-btn" onClick={(e) => { e.stopPropagation(); onPin(); }}>
                    Pin to Dashboard
                </button>
            )}

        </div>
    );
}