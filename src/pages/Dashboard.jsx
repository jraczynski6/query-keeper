import React from "react";
import { DndContext } from "@dnd-kit/core";
import CanvasDraggable from "../components/CanvasDraggable";
import "./Dashboard.css";
import { useNavigate } from "react-router-dom";
import { useDashboard } from "../contexts/DashboardContext";
import EditableNoteCard from "../components/EditableNoteCard";
import { createNoteCard } from "../utils/createNoteCard";

export default function Dashboard() {
  const isAuthenticated = true; // temporary fix
  const {
    pinnedItems,
    updatePosition,
    pinItem,
    unpinItem,
    updateNoteContent,
  } = useDashboard({ isAuthenticated });

  const navigate = useNavigate();

  // Drag end handler
  const handleDragEnd = (event) => {
    const { id } = event.active;
    const { x, y } = event.delta;

    const item = pinnedItems.find((i) => i.id === id);
    if (!item) return;

    updatePosition(id, {
      x: item.position.x + x,
      y: item.position.y + y,
    });
  };

  // Add new note
  const handleAddNote = () => {
    const newNote = createNoteCard();
    pinItem(newNote);
  };

  return (
    <div className="dashboard-page">
      <main className="dashboard-content">
        <DndContext onDragEnd={handleDragEnd}>
          <div className="dashboard-canvas">

            {/* Floating Add Note Button */}
            <div className="floating-buttons">
              <button onClick={handleAddNote}>Add Note</button>
            </div>

            {/* Pinned Items */}
            {pinnedItems.map((item) => (
              <CanvasDraggable key={item.id} id={item.id} position={item.position}>
                
                {/* Note Card */}
                {item.type === "note" ? (
                  <EditableNoteCard
                    note={item}
                    onUpdate={updateNoteContent} // pass it directly
                    onDelete={() => unpinItem({ id: item.id })}
                  />
                ) : item.type === "project" && item.projectData ? (
                  <div className="mini-card project-card">
                    <h4>{item.projectData.title || "Untitled Project"}</h4>
                    <p>Wordcount: {item.projectData.wordCount ?? "N/A"}</p>
                    <p>Genre: {item.projectData.genre ?? "N/A"}</p>
                    {item.projectData.agent && (
                      <p>
                        Agent: {item.projectData.agent.firstName ?? "Unknown"}{" "}
                        {item.projectData.agent.lastName ?? ""}
                      </p>
                    )}
                    {item.projectData.id && (
                      <button
                        className="card-action-btn"
                        onClick={() => navigate(`/projects/${item.projectData.id}`)}
                      >
                        Go to Page
                      </button>
                    )}
                  </div>
                ) : item.type === "agent" && item.agentData ? (
                  <div className="mini-card agent-card">
                    <h4>
                      {item.agentData.firstName ?? "Unnamed"}{" "}
                      {item.agentData.lastName ?? "Agent"}
                    </h4>
                    <p>Agency: {item.agentData.agency ?? "Unknown"}</p>
                    <p>Email: {item.agentData.email ?? "N/A"}</p>
                    {item.agentData.id && (
                      <button
                        className="card-action-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/agents/${item.agentData.id}`);
                        }}
                      >
                        Go to Page
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="mini-card">
                    <p>Data unavailable</p>
                  </div>
                )}
              </CanvasDraggable>
            ))}
          </div>
        </DndContext>
      </main>
    </div>
  );
}
