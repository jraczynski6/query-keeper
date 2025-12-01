import { useDraggable } from "@dnd-kit/core";
import { useState, useEffect } from "react";

export default function CanvasDraggable({ id, children, position, canvasSize, zIndex = 1, onSize, onMouseDown, onDelete }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
    onDragStart: () => {
      // bring to front on drag start
      onMouseDown?.();
    },
  });

  const [cardSize, setCardSize] = useState({ width: 0, height: 0 });

  const measuredRef = (node) => {
    setNodeRef(node);
    if (node) {
      const width = node.offsetWidth;
      const height = node.offsetHeight;
      setCardSize(prev => {
        if (prev.width !== width || prev.height !== height) {
          return { width, height };
        }
        return prev;
      });
    }
  };

  useEffect(() => {
    if (cardSize.width && cardSize.height) {
      onSize?.(id, cardSize);
    }
  }, [cardSize]);

  const x = Math.min(Math.max(position.x, 0), canvasSize.width);
  const y = Math.min(Math.max(position.y, 0), canvasSize.height);

  const style = {
    position: "absolute",
    left: 0,
    top: 0,
    transform: transform
      ? `translate3d(${x + transform.x}px, ${y + transform.y}px, 0)`
      : `translate3d(${x}px, ${y}px, 0)`,
    zIndex,
    cursor: "grab",
    userSelect: "none",
  };

  return (
    <div ref={measuredRef} style={style} onMouseDown={onMouseDown}>
      <div {...listeners} {...attributes} className="drag-handle">
        <div className="drag-handle-icon" />
      </div>
      <div>{children}</div>
    </div>
  );
}
