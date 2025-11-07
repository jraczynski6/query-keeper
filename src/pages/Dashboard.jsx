import React from "react";
import { DndContext } from "@dnd-kit/core";
import CanvasDraggable from "../components/CanvasDraggable";
import "../styles/Dashboard.css"

export default function Dashboard() {
    return (

        <div className="dashboard-page">
            <main className="dashboard-content">
                <DndContext>
                    <div className="dashboard-canvas">
                        <CanvasDraggable
                            id="item1"
                            content={
                                <div className="draggable-note">
                                    Draggable Note
                                </div>
                            }
                            position={{ x: 50, y: 50 }}
                        />
                    </div>
                </DndContext>
            </main>
        </div>
    )
}