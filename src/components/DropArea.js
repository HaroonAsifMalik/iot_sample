import React from "react";
import { useDroppable } from "@dnd-kit/core";

const combinedClassName = "w-full p-2 bg-red-300  text-2xl h-screen flex-left ";

export default function DropArea({ children }) {
  const { isOver, setNodeRef } = useDroppable({
    id: "droppable",
  });
  const style = {
    color: isOver ? "green" : undefined,
  };

  return (
    <div ref={setNodeRef} style={{ ...style }} className={combinedClassName}>
      <h1 className="justify-center flex p-3 m-3">This is drop area</h1>
      {children}
    </div>
  );
}
