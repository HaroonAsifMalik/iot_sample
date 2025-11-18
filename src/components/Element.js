import React from "react";
import { useDraggable } from "@dnd-kit/core";
import { FaTimes } from "react-icons/fa";

const combinedClassName =
  "bg-green-300 justify-center items-center flex rounded-md p-3 m-2 relative cursor-move hover:bg-green-400 transition-colors";

export default function Element({
  note,
  icon: Icon,
  hoverText,
  description,
  resetPosition,
}) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: note.id,
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        opacity: isDragging ? 0.5 : 1,
      }
    : {
        opacity: isDragging ? 0.5 : 1,
      };

  const handleResetClick = (e) => {
    e.stopPropagation();
    if (resetPosition) {
      resetPosition(note.id);
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={combinedClassName}
      {...listeners}
      {...attributes}
      title={hoverText}
    >
      {/* Render the passed icon */}
      <Icon className="mr-2 text-xl" />
      <span className="text-sm font-medium">{hoverText}</span>

      {/* Cross icon for resetting the element position */}
      {(note.position.x !== 0 || note.position.y !== 0) && resetPosition && (
        <button
          onClick={handleResetClick}
          className="absolute top-0 right-0 bg-black rounded-full p-1 cursor-pointer hover:bg-red-600 transition-colors z-10"
          title="Reset position"
        >
          <FaTimes className="text-white text-xs" />
        </button>
      )}

      {/* Description tooltip */}
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded px-2 py-1 whitespace-nowrap">
        {description}
      </div>
    </div>
  );
}
