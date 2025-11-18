import React, { useState } from "react";
import { SketchPicker } from "react-color"; // For color control

export default function SmartLight() {
  const [intensity, setIntensity] = useState(50); // Default brightness 50%
  const [color, setColor] = useState("#ffffff"); // Default white color
  const [schedule, setSchedule] = useState({ onTime: "", offTime: "" });
  const [voiceScene, setVoiceScene] = useState("");

  // Handle slider change for intensity
  const handleIntensityChange = (e) => {
    setIntensity(e.target.value);
  };

  // Handle color change
  const handleColorChange = (color) => {
    setColor(color.hex);
  };

  // Handle schedule change
  const handleScheduleChange = (e) => {
    const { name, value } = e.target;
    setSchedule((prev) => ({ ...prev, [name]: value }));
  };

  // Handle saving voice scene/room control
  const handleSceneChange = (e) => {
    setVoiceScene(e.target.value);
  };

  return (
    <div className="smart-light-settings p-4 bg-white w-80 min-h-[500px] max-h-[600px] overflow-y-auto rounded-md shadow-lg">
      <h2 className="text-lg font-bold mb-4">Smart Light</h2>

      {/* Light Intensity Control */}
      <div className="mb-4">
        <label className="block text-sm font-medium">Light Intensity: {intensity}%</label>
        <input
          type="range"
          min="0"
          max="100"
          value={intensity}
          onChange={handleIntensityChange}
          className="w-full"
        />
      </div>

      {/* Color Control */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Color Control</label>
        <div className="flex items-center space-x-2 mb-2">
          <div 
            className="w-12 h-12 rounded border-2 border-gray-300"
            style={{ backgroundColor: color }}
          />
          <span className="text-sm font-mono">{color}</span>
        </div>
        <SketchPicker 
          color={color} 
          onChangeComplete={handleColorChange}
          width="100%"
        />
      </div>

      {/* Scheduling */}
      <div className="mb-4">
        <label className="block text-sm font-medium">Schedule Light On/Off</label>
        <div className="flex space-x-4">
          <div>
            <label className="text-xs">ON Time</label>
            <input
              type="time"
              name="onTime"
              value={schedule.onTime}
              onChange={handleScheduleChange}
              className="block w-full p-1 border rounded"
            />
          </div>
          <div>
            <label className="text-xs">OFF Time</label>
            <input
              type="time"
              name="offTime"
              value={schedule.offTime}
              onChange={handleScheduleChange}
              className="block w-full p-1 border rounded"
            />
          </div>
        </div>
      </div>

      {/* Voice/Scene Control */}
      <div className="mb-4">
        <label className="block text-sm font-medium">Voice/Scene Control</label>
        <input
          type="text"
          value={voiceScene}
          onChange={handleSceneChange}
          placeholder="Assign to room or scene (e.g., Living Room)"
          className="w-full p-2 border rounded"
        />
      </div>

      {/* Save Settings Button */}
      <button className="w-full px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md font-medium transition-colors">
        Save Settings
      </button>
    </div>
  );
}
