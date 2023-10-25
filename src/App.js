import "./App.css";
import React, { useState } from "react";
import ElementContainer from "./components/ElementContainer";
import DropArea from "./components/DropArea";
import { DndContext } from "@dnd-kit/core";
import Droppable from "./components/Droppable";

const testData = [
  { id: 1, text: "A" },
  { id: 2, text: "B" },
  { id: 3, text: "C" },
  { id: 4, text: "D" },
  { id: 5, text: "E" },
];

function App() {
  const [isDropped, setIsDropped] = useState(false);

  function handleDragEnd(event) {
    console.log("handleDragEnd called", event);

    if (event.over && event.over.id === "drop-area") {
      setIsDropped(true);
    }
  }

  return (
    <div className="flex h-screen bg-red-200">
      <DndContext onDragEnd={handleDragEnd}>
        <div className="w-1/4 p-2">
          <ElementContainer testData={testData} />
        </div>
        <div className="w-full p-2 bg-red-300 h-screen ">
          <Droppable id="drop-area">
            <DropArea />
          </Droppable>
        </div>
      </DndContext>
    </div>
  );
}
export default App;
