import React, { useState } from "react";
import { DndContext } from "@dnd-kit/core";
import CanvasDraggable from "../components/CanvasDraggable";
import "../styles/Dashboard.css";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
    const navigate = useNavigate();

    
    // mock data cards
    const [items, setItems] = useState([
        {
            id: "project1",
            content: <div className="mini-card project-card">
                <h4>Project: Best Novel Ever</h4>
                <button onClick={() => navigate("/projects/1")}>Go to Page</button>
            </div>,
            position: { x: 50, y: 50 },
        },
        {
            id: "agent1",
            content: <div className="mini-card agent-card">
                <h4>Jane Doe</h4>
                <p>Best Agent Agency</p>
                <button onClick={() => navigate("/agents/1")}>Go to Page</button>
            </div>,
            position: { x: 200, y: 100 },
        },
    ]);

    const handleDragEnd = (event) => {
        const { id } = event.active;
        const { x, y } = event.delta; // delta - distance from current and starting position

        setItems((prevItems) =>
            prevItems.map((item) =>
                item.id === id
                    ? {
                        ...item,
                        // calculate new coordinates
                        position: { x: item.position.x + x, y: item.position.y + y },
                    }
                    : item
            )
        );
    };


    return (

        <div className="dashboard-page">
            <main className="dashboard-content">
                <DndContext onDragEnd={handleDragEnd}>
                    <div className="dashboard-canvas">
                        {items.map((item) => (
                            <CanvasDraggable
                                key={item.id}
                                id={item.id}
                                content={item.content}
                                position={item.position}
                            />
                        ))}
                    </div>
                </DndContext>
            </main>
        </div>
    )
}

// TODO: Add canvasRef for boundaries
// TODO: Add logic for pinning mini cards and linking to source page
// TODO: Add new card button
// TODO: Add focus on card select
