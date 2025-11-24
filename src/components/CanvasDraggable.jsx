import { useDraggable } from "@dnd-kit/core";
import "./CanvasDraggable.css";
import { useState, useEffect } from "react";

export default function CanvasDraggable({ id, children, position, canvasSize, onSize }) {

  
  //standard dnd-kit draggable setup
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });

  const [cardSize, setCardSize] = useState({ width: 0, height: 0 });

  //  Wrap setNodeRef
  const measuredRef = (node) => {
    setNodeRef(node);

    if (node) {
      const width = node.offsetWidth;
      const height = node.offsetHeight;

      //update localstate
      setCardSize((prev) => {
        if (prev.width !== width || prev.height !== height) {
          return { width, height };
        }
        return prev;
      });
    }
  };

  // Tell parent whenever size is detected/changes
  useEffect(() => {
    if (cardSize.width && cardSize.height) {
      // parent callback
      onSize?.(id, cardSize);
    }
  }, [cardSize]);

  // position correction - Make sure position is within canvas bounds
  const x = Math.min(Math.max(position.x, 0), canvasSize.width);
  const y = Math.min(Math.max(position.y, 0), canvasSize.height);

  // combine stored x/y with ongoing drag
  const style = {
    position: "absolute",
    transform: transform
      ? `translate3d(${x + transform.x}px, ${y + transform.y}px, 0)`
      : `translate3d(${x}px, ${y}px, 0)`,
    cursor: "grab",
    userSelect: "none", 
  };

  return (
    <div ref={measuredRef} style={style}>
      <div {...listeners} {...attributes} className="drag-handle">
        <span>: :</span>
      </div>
      <div>{children}</div>
    </div>
  );
}