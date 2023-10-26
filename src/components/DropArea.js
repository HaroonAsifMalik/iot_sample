import React from "react";
import { useDroppable } from "@dnd-kit/core";
export default function DropArea({ children, id, className }) {
  const { isOver, setNodeRef } = useDroppable({
    id: id,
  });
  const style = {
    color: isOver ? "green" : undefined,
  };

  return (
    <div
      ref={setNodeRef}
      style={{ ...style }}
      className="w-full p-2 bg-red-300  text-2xl h-screen flex-left "
    >
      <h1 className="justify-center text-xl flex p-3 m-3">
        This Area for Dropping Notes
      </h1>
      {children}
    </div>
  );
}
