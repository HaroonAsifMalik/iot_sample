import React, { useState } from "react";
import { DndContext } from "@dnd-kit/core";
import ElementContainer from "./components/ElementContainer";
import DropArea from "./components/DropArea";

//setting default position
const position = {
  x: 0,
  y: 0,
};

//starting test data
const notesData = [
  {
    id: 1,
    content: "A",
    position: { ...position },
  },
  {
    id: 2,
    content: "B",
    position: { ...position },
  },
  {
    id: 3,
    content: "C",
    position: { ...position },
  },
  {
    id: 4,
    content: "D",
    position: { ...position },
  },
  {
    id: 5,
    content: "E",
    position: { ...position },
  },
];

export default function App() {
  const [notes, setNotes] = useState(notesData);

  function handleDragEnd(ev) {
    const note = notes.find((x) => x.id === ev.active.id);
    //assiging new positions

    note.position.x += ev.delta.x;
    note.position.y += ev.delta.y;

    //updates list
    const _notes = notes.map((x) => {
      if (x.id === note.id) return note;
      return x;
    });
    setNotes(_notes);
  }
  return (
    <div className="flex h-screen bg-green-300">
      <DndContext onDragEnd={handleDragEnd}>
        <ElementContainer notes={notes} />
        <DropArea />
      </DndContext>
    </div>
  );
}
