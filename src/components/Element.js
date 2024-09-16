import React, { useEffect } from "react";
import { useDraggable } from "@dnd-kit/core";
import { FaTimes } from "react-icons/fa"; // Import the cross icon

const combinedClassName =
  "bg-green-300 justify-center flex rounded-md p-3 m-2 relative";

export default function Element({
  note,
  icon: Icon,
  hoverText,
  description,
  resetPosition,
}) {
  const { attributes, listeners, setNodeRef, transform, setActivatorNodeRef } = useDraggable({
    id: note.id,
  });

  // Clear transform style when position is reset to avoid dragging offset issues
  const style = transform && note.position.x === 0 && note.position.y === 0 
    ? {}
    : transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : {};

  useEffect(() => {
    // Reset the draggable transform when the position is reset
    if (note.position.x === 0 && note.position.y === 0) {
      setActivatorNodeRef(null); // Reset draggable state
    }
  }, [note.position, setActivatorNodeRef]);

  return (
    <div
      ref={setNodeRef}
      style={{
        ...style,
        position: "relative",
        left: note.position.x,
        top: note.position.y,
      }}
      className={combinedClassName}
      {...listeners}
      {...attributes}
      title={hoverText} // Hover text displayed when mouse is over the element
    >
      {/* Render the passed icon */}
      <Icon className="mr-2" />

      {/* Cross icon for resetting the element position */}
      {note.position.x !== 0 || note.position.y !== 0 ? (
        <div
          onClick={() => resetPosition(note.id)}
          className="absolute top-0 right-0 bg-black rounded-full p-1 cursor-pointer"
        >
          <FaTimes className="text-white" />
        </div>
      ) : null}

      {/* Optional description */}
      <p className="hidden hover:block text-xs">{description}</p>
    </div>
  );
}
