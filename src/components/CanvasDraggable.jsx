import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import "../styles/CanvasDraggable.css";

export default function CanvasDraggable({ id, content, position }) {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });

    const style = {
        position: "absolute", // required for positioning inside canvas
        cursor: "grab",
        transform: transform
            ? `translate3d(${position.x + transform.x}px, ${position.y + transform.y}px, 0)`
            : `translate3d(${position.x}px, ${position.y}px, 0)`,
        userSelect: "none",
    }

    return (
        <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
            {content}
        </div>
    );
}
