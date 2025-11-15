import { useDraggable } from "@dnd-kit/core";

export default function CanvasDraggable({ id, children, position, canvasSize }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });

  // Make sure position is within canvas bounds
  const x = Math.min(Math.max(position.x, 0), canvasSize.width);
  const y = Math.min(Math.max(position.y, 0), canvasSize.height);

  const style = {
    position: "absolute",
    transform: transform
      ? `translate3d(${x + transform.x}px, ${y + transform.y}px, 0)`
      : `translate3d(${x}px, ${y}px, 0)`,
    cursor: "grab",
    userSelect: "none",
  };

  return (
    <div ref={setNodeRef} style={style}>
      <div {...listeners} {...attributes} className="drag-handle">
        <span>:::::::</span>
      </div>
      <div>{children}</div>
    </div>
  );
}
