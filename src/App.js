import React, { useState } from "react";
import { DndContext } from "@dnd-kit/core";
import ElementContainer from "./components/ElementContainer";
import DropArea from "./components/DropArea";
import { FaThermometerEmpty, FaFan, FaLightbulb, FaWater, FaWifi, FaPlug, FaCogs } from "react-icons/fa";
import TemperatureSensor from "./components/TemperatureSensor";
import FanController from "./components/FanController";
import SmartLight from "./components/SmartLight";
import WaterLeakDetector from "./components/WaterLeakDetector";
import WiFiModule from "./components/WiFiModule";
import SmartPlug from "./components/SmartPlug";
import Configuration from "./components/Configuration";

// setting default position
const position = {
  x: 0,
  y: 0,
};

const COMPONENT_MAP = {
  FaThermometerEmpty: TemperatureSensor,
  FaFan: FanController,
  FaLightbulb: SmartLight,
  FaWater: WaterLeakDetector,
  FaWifi: WiFiModule,
  FaPlug: SmartPlug,
  FaCogs: Configuration,
};

const notesData = [
  {
    id: 1,
    content: "A",
    icon: FaThermometerEmpty,
    hoverText: "Temperature Sensor",
    description: "Monitors room temperature",
    type: "sensor",
    position: { ...position },
  },
  {
    id: 2,
    content: "B",
    icon: FaFan,
    hoverText: "Fan Controller",
    description: "Controls the speed of the fan",
    type: "controller",
    position: { ...position },
  },
  {
    id: 3,
    content: "C",
    icon: FaLightbulb,
    hoverText: "Smart Light",
    description: "Controls room lighting",
    type: "controller",
    position: { ...position },
  },
  {
    id: 4,
    content: "D",
    icon: FaWater,
    hoverText: "Water Leak Detector",
    description: "Detects water leaks in the system",
    type: "sensor",
    position: { ...position },
  },
  {
    id: 5,
    content: "E",
    icon: FaWifi,
    hoverText: "WiFi Module",
    description: "Handles IoT device communication",
    type: "module",
    position: { ...position },
  },
  {
    id: 6,
    content: "F",
    icon: FaPlug,
    hoverText: "Smart Plug",
    description: "Monitors and controls power usage",
    type: "controller",
    position: { ...position },
  },
  {
    id: 7,
    content: "G",
    icon: FaCogs,
    hoverText: "Configuration",
    description: "Device configuration settings",
    type: "settings",
    position: { ...position },
  },
];

export default function App() {
  const [notes, setNotes] = useState(notesData);
  const [droppedComponents, setDroppedComponents] = useState([]);

  // Reset position of a note element
  const resetPosition = (noteId) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === noteId ? { ...note, position: { x: 0, y: 0 } } : note
      )
    );
  };

  function handleDragEnd(ev) {
    const note = notes.find((x) => x.id === ev.active.id);
    if (!note) return;

    // Only add component if dropped in the drop area and not already added
    if (ev.over && ev.over.id === "container1") {
      const Component = COMPONENT_MAP[note.icon.name];
      if (Component) {
        // Check if component already exists to prevent duplicates
        const componentId = `${note.icon.name}-${Date.now()}`;
        setDroppedComponents((prev) => [
          ...prev,
          {
            id: componentId,
            type: note.icon.name,
            Component: Component,
            noteId: note.id,
          },
        ]);
      }
    }

    // Reset note position after drop
    if (ev.over && ev.over.id === "container1") {
      setNotes((prevNotes) =>
        prevNotes.map((n) =>
          n.id === note.id ? { ...n, position: { x: 0, y: 0 } } : n
        )
      );
    }
  }

  // Remove a dropped component
  const removeComponent = (componentId) => {
    setDroppedComponents((prev) =>
      prev.filter((comp) => comp.id !== componentId)
    );
  };

  return (
    <div className="flex h-screen w-full">
      <DndContext onDragEnd={handleDragEnd}>
        <ElementContainer notes={notes} resetPosition={resetPosition} />
        <DropArea id="container1" onRemoveComponent={removeComponent} isEmpty={droppedComponents.length === 0}>
          <div className="flex flex-wrap gap-4 p-4">
            {droppedComponents.map((item) => {
              const { Component, id } = item;
              return (
                <div key={id} className="relative">
                  <button
                    onClick={() => removeComponent(id)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs z-10 hover:bg-red-600"
                    title="Remove component"
                  >
                    ×
                  </button>
                  <Component />
                </div>
              );
            })}
          </div>
        </DropArea>
      </DndContext>
    </div>
  );
}