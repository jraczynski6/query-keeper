import { useDraggable } from "@dnd-kit/core";
export default function CanvasDraggable({ id, children, position }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });

  const style = {
    position: "absolute",
    transform: transform
      ? `translate3d(${position.x + transform.x}px, ${position.y + transform.y}px, 0)`
      : `translate3d(${position.x}px, ${position.y}px, 0)`,
    cursor: "grab",
    userSelect: "none",
  };

  return (
    <div ref={setNodeRef} style={style}>
      <div {...listeners} {...attributes} className="drag-handle">
        {/*  drag area */}
        <span>::</span>
      </div>
      <div>
        {children}
      </div>
    </div>
  );
}
