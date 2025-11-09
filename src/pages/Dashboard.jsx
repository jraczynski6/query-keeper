import React, { useState } from "react";
import { DndContext } from "@dnd-kit/core";
import CanvasDraggable from "../components/CanvasDraggable";
import "../styles/Dashboard.css"

export default function Dashboard() {
    const [items, setItems] = useState([
        {
            id: "project1",
            content: <div className="mini-card project-card">
                <h4>Project: Best Novel Ever</h4>
            </div>,
            position: { x: 50, y: 50 },
        },
        {
            id: "agent1",
            content: <div className="mini-card agent-card">
                <h4>Jane Doe</h4>
                <p>Best Agent Agency</p>
                </div>,
            position: { x: 200, y: 100 },
        },
    ]);

    const handleDragEnd = (event) => {
        const { id } = event.active;
        // delta - distance from current and starting position
        const { x, y } = event.delta;

        setItems((prevItems) =>
            prevItems.map((item) =>
                item.id === id
                    ? {
                        ...item,
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
