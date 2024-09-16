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
import SmartPlug from "./components/SmartPlug"
import Configuration from "./components/Configuration"

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
  FaPlug:SmartPlug,
  FaCogs:Configuration,
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

  function handleDragEnd(ev) {
    const note = notes.find((x) => x.id === ev.active.id);

    if (ev.over) {
      const Component = COMPONENT_MAP[note.icon.name];
      if (Component) {
        setDroppedComponents((prev) => [...prev, <Component key={note.id} />]);
      }
    }

    note.position.x += ev.over ? ev.delta.x : 0;
    note.position.y += ev.over ? ev.delta.y : 0;

    setNotes([...notes]);
  }

  return (
    <div className="flex h-full flex-left">
      <DndContext onDragEnd={handleDragEnd}>
        <ElementContainer notes={notes} />
        <DropArea id="container1">
          {droppedComponents.map((component) => component)}
        </DropArea>
      </DndContext>
    </div>
  );
}