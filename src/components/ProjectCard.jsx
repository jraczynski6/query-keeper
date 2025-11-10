import React from "react";
import "../styles/ProjectCard.css";
import { useDashboard } from "../contexts/DashboardContext";
import { useNavigate } from "react-router-dom";

export default function ProjectCard({ project, onSelect, onPin, isSelected }) {
    const navigate = useNavigate();
    const { title, wordCount, genre, agent } = project; // destructure

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
                <button
                    className="pin-btn"
                    onClick={(e) => {
                        e.stopPropagation();
                        onPin();
                    }}
                >
                    Pin to Dashboard
                </button>
            )}

        </div>
    );
}