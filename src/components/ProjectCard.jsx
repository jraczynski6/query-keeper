import React from "react";
import "../styles/ProjectCard.css";

export default function ProjectCard({id, title, wordcount, genre, onSelect}) {
    return (
        <div className="project-card" onClick={onSelect}>
            <h3 className="project-title">{title}</h3>
            <p className="project-wordcount">Wordcount:{wordcount}</p>
            <p className="project-genre">Genre: {genre}</p> 
        </div>
    );
}