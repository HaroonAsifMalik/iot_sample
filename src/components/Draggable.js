import React from "react";
import { useDraggable } from "@dnd-kit/core";

const combinedClassName = "bg-red-300 justify-center flex rounded-md p-3 m-3";

export function Draggable({ id, content, styles }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : {};

  return (
    <div
      ref={setNodeRef}
      style={{ ...style, ...styles }}
      className={combinedClassName}
      {...listeners}
      {...attributes}
    >
      {content}
    </div>
  );
}
