import React, { useRef, useState, useEffect } from "react";
import { DndContext } from "@dnd-kit/core";
import CanvasDraggable from "../components/CanvasDraggable";
import EditableNoteCard from "../components/EditableNoteCard";
import { createNoteCard } from "../utils/createNoteCard";
import { useDashboard } from "../contexts/DashboardContext";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

export default function Dashboard() {
  const isAuthenticated = true;
  const {
    pinnedItems,
    updatePosition,
    pinItem,
    unpinItem,
    updateNoteContent,
  } = useDashboard({ isAuthenticated });

  const canvasRef = useRef(null);
  const [canvasSize, setCanvasSize] = useState({ width: 800, height: 600 });
  const navigate = useNavigate();

  //  do not change 
  // define card dimensions here so they are available in render and handlers
  const CARD_WIDTH = 240;
  const CARD_HEIGHT = 180;

  // canvas size tracking
  useEffect(() => {
    const updateSize = () => {
      if (canvasRef.current) {
        setCanvasSize({
          width: canvasRef.current.offsetWidth,
          height: canvasRef.current.offsetHeight,
        });
      }
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  // drag end handler
  const handleDragEnd = (event) => {
    const { id } = event.active;
    const { x: deltaX, y: deltaY } = event.delta;

    const item = pinnedItems.find((i) => i.id === id);
    if (!item) return;

    const { width, height } = canvasSize;

    // convert relative to absolute
    let newX = item.position.x * width + deltaX;
    let newY = item.position.y * height + deltaY;

    // clamp so card stays fully inside canvas
    newX = Math.max(0, Math.min(newX, width - CARD_WIDTH));
    newY = Math.max(0, Math.min(newY, height - CARD_HEIGHT));

    // convert back to fraction and save
    updatePosition(id, {
      x: newX / width,
      y: newY / height,
    });
  };

  // add note
  const handleAddNote = () => {
    const newNote = createNoteCard(); // ensure createNoteCard uses fraction positions (e.g., 0.1,0.1) only way this works
    pinItem(newNote);
  };

  return (
    <div className="dashboard-page">
      <main className="dashboard-content">
        {/* floating button outside canvas (always clickable) */}
        <div className="floating-buttons">
          <button onClick={handleAddNote}>Add Note</button>
        </div>

        <DndContext onDragEnd={handleDragEnd}>
          <div className="dashboard-canvas" ref={canvasRef}>
            {/* render pinned items convert fraction -> pixel */}
            {pinnedItems.map((item) => {
              const { width, height } = canvasSize;

              // convert relative -> absolute
              let absX = (item.position?.x ?? 0) * width;
              let absY = (item.position?.y ?? 0) * height;

              // clamp within canvas bounds (respect card size)
              absX = Math.max(0, Math.min(absX, width - CARD_WIDTH));
              absY = Math.max(0, Math.min(absY, height - CARD_HEIGHT));

              return (
                <CanvasDraggable
                  key={item.id}
                  id={item.id}
                  position={{ x: absX, y: absY }}
                  canvasSize={canvasSize}
                >
                  {/* Note */}
                  {item.type === "note" ? (
                    <EditableNoteCard
                      note={item}
                      onUpdate={updateNoteContent}
                      onDelete={() => unpinItem({ id: item.id })}
                    />
                  ) : null}

                  {/* Project */}
                  {item.type === "project" && item.projectData ? (
                    <div className="mini-card project-card">
                      <h4>{item.projectData.title ?? "Untitled Project"}</h4>
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
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/projects/${item.projectData.id}`);
                          }}
                        >
                          Go to Page
                        </button>
                      )}
                    </div>
                  ) : null}

                  {/* Agent */}
                  {item.type === "agent" && item.agentData ? (
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
                  ) : null}
                </CanvasDraggable>
              );
            })}
          </div>
        </DndContext>
      </main>
    </div>
  );
}
// TODO: Clear dashboard
// TODO: Save dashboard cards to localstorage - btn