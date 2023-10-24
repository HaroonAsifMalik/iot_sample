import "./App.css";
import React, { useState } from "react";
import ElementContainer from "./components/ElementContainer";
import DropArea from "./components/DropArea";
import { DndContext } from "@dnd-kit/core";

const testData = [
  { id: 1, text: "A" },
  { id: 2, text: "B" },
  { id: 3, text: "C" },
  { id: 4, text: "D" },
  { id: 5, text: "E" },
];

function App() {
  return (
    <div className="flex h-screen bg-red-200">
      <DndContext>
        <div className="w-1/4 p-2 ">
          <ElementContainer testData={testData} />
        </div>
        <div className="w-full  p-2">
          <DropArea />
        </div>
      </DndContext>
    </div>
  );
}
export default App;
