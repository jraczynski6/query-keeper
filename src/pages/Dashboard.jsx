import React from "react";
import { DndContext } from "@dnd-kit/core";


export default function Dashboard() {
    return (
        
        <div className="dashboard-page">
            <main className="dashboard-content">
                <DndContext>
                {/* Canvas Here */}
                <p>Canvas Here</p>
                </DndContext>
            </main>
        </div>
    )
}