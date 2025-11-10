import React from "react";
import { DndContext } from "@dnd-kit/core";
import CanvasDraggable from "../components/CanvasDraggable";
import "../styles/Dashboard.css";
import { useNavigate } from "react-router-dom";
import { useDashboard } from "../contexts/DashboardContext";

export default function Dashboard() {
    const { pinnedItems, updatePosition } = useDashboard();
    const navigate = useNavigate();


    // // mock data cards
    // const [items, setItems] = useState([
    //     {
    //         id: "project1",
    //         content: <div className="mini-card project-card">
    //             <h4>Project: Best Novel Ever</h4>
    //             <button onClick={() => navigate("/projects/1")}>Go to Page</button>
    //         </div>,
    //         position: { x: 50, y: 50 },
    //     },
    //     {
    //         id: "agent1",
    //         content: <div className="mini-card agent-card">
    //             <h4>Jane Doe</h4>
    //             <p>Best Agent Agency</p>
    //             <button onClick={() => navigate("/agents/1")}>Go to Page</button>
    //         </div>,
    //         position: { x: 200, y: 100 },
    //     },
    // ]);

    const handleDragEnd = (event) => {
        const { id } = event.active;
        const { x, y } = event.delta; // delta - distance from current and starting position

        const item = pinnedItems.find(i => i.id === id);
        if (!item) return;

        updatePosition(id, {
            x: item.position.x + x,
            y: item.position.y + y
        });
    };


    return (

        <div className="dashboard-page">
            <main className="dashboard-content">
                <DndContext onDragEnd={handleDragEnd}>
                    <div className="dashboard-canvas">
                        {pinnedItems.map((item) => (
                            <CanvasDraggable
                                key={item.id}
                                id={item.id}
                                content={
                                    <div className={`mini-card ${item.type}-card`}>
                                        <h4>{item.projectData.title}</h4>
                                        <p>Wordcount: {item.projectData.wordCount}</p>
                                        <p>Genre: {item.projectData.genre}</p>
                                        {item.projectData.agent && (
                                            <p>Agent: {item.projectData.agent.firstName} {item.projectData.agent.lastName}</p>
                                        )}
                                        <button onClick={() => navigate(item.link)}>Go to Page</button>
                                    </div>
                                }
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
