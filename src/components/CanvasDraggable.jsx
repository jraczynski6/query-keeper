import React from 'react';
import { useDraggable } from '@dnd-kit/core';

export default function CanvasDraggable({ id, content, position }) {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: 'draggable',
    });

    const style = {
        position: "absolute",
        cursor: "grab",
        transform: transform
            ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
            : `translate3d(${position.x}px, ${position.y}px, 0)`,
    }

    return (
        <button ref={setNodeRef} style={style} {...listeners} {...attributes}>
            {props.children}
        </button>
    );
}
