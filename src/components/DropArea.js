import React from "react";
import { useDroppable } from "@dnd-kit/core";

export default function DropArea({ children, id, className, onRemoveComponent, isEmpty }) {
  const { isOver, setNodeRef } = useDroppable({
    id: id,
  });

  return (
    <div
      ref={setNodeRef}
      className={`flex-1 h-screen overflow-y-auto ${
        isOver ? "bg-green-200" : "bg-gray-100"
      } transition-colors duration-200 ${className || ""}`}
    >
      <h1 className="text-xl font-bold text-center p-4 border-b-2 border-gray-300 sticky top-0 bg-inherit z-10">
        Dashboard - Drop IoT Components Here
      </h1>
      {isEmpty ? (
        <div className="flex items-center justify-center h-full text-gray-400">
          <p className="text-lg">Drag and drop IoT components from the sidebar</p>
        </div>
      ) : (
        children
      )}
    </div>
  );
}
