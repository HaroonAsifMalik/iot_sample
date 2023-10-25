import React from "react";
import { useDroppable } from "@dnd-kit/core";

const combinedClassName = "w-full p-2 bg-red-300 h-screen flex-left ";

export function Droppable({ children }) {
  const { isOver, setNodeRef } = useDroppable({
    id: "droppable",
  });
  const style = {
    color: isOver ? "green" : undefined,
    // Set the width to 75%
    // width: "75%",
  };

  return (
    <div ref={setNodeRef} style={{ ...style }} className={combinedClassName}>
      {children}
    </div>
  );
}
