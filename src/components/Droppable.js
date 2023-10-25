import React from "react";
import { useDroppable } from "@dnd-kit/core";

export default function Droppable(props) {
  const { isOver, setNodeRef } = useDroppable({
    id: "droppable",
  });
  const style = {
    color: isOver ? "green" : undefined,
  };

  // console.log("Drop----", isOver);

  return (
    <div ref={setNodeRef} style={style}>
      {props.children}
    </div>
  );
}