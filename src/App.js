import React, { useState } from "react";
import { DndContext } from "@dnd-kit/core";
import Elements from "./components/Elements";
import Droppable from "./components/Droppable";
import Draggable from "./components/Draggable";

const testData = [
  { id: 1, text: "A" },
  { id: 2, text: "B" },
  { id: 3, text: "C" },
  { id: 4, text: "D" },
  { id: 5, text: "E" },
];

function App() {
  const [parent, setParent] = useState(null);

  return (
    <DndContext onDragEnd={handleDragEnd}>
      {testData.map((element) => (
        <Draggable key={element.id} id={element.id}>
          <Elements text={element.text} />
        </Draggable>
      ))}

      {testData.map((element) => (
        <Droppable key={element.id} id={element.id}>
          {parent === element.id ? (
            <Elements text={element.text} />
          ) : (
            "Drop here"
          )}
        </Droppable>
      ))}
    </DndContext>
  );

  function handleDragEnd(event) {
    const { over, active } = event;

    // If the item is dropped over a container, set it as the parent
    if (over) {
      setParent(over.id);
    }
    // If the item is dragged back to its original position, reset the parent
    if (active && active.id === parent) {
      setParent(null);
    }
  }
}

export default App;
