import React from "react";
import { useDraggable } from "@dnd-kit/core";

const combinedClassName =
  " bg-green-300 justify-center flex rounded-md p-3 m-2";

export default function Element({ note }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: note.id,
  });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : {};

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
    >
      {note.content}
    </div>
  );
}
