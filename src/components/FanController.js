import React, { useState, useEffect } from "react";
import { FaFan } from "react-icons/fa";

const FanController = ({ temperatureData }) => {
  const [fanStatus, setFanStatus] = useState(false); // Fan ON/OFF
  const [fanSpeed, setFanSpeed] = useState(0); // Fan speed (RPM or levels)
  const [mode, setMode] = useState("manual"); // Mode: manual or automatic
  const [autoSpeed, setAutoSpeed] = useState(0); // Auto-adjusted speed based on temperature

  // Set thresholds for auto mode based on temperature
  useEffect(() => {
    if (mode === "automatic") {
      const currentTemp = temperatureData[temperatureData.length - 1]; // Latest temperature
      if (currentTemp >= 30) {
        setAutoSpeed(3); // High speed
      } else if (currentTemp >= 25) {
        setAutoSpeed(2); // Medium speed
      } else {
        setAutoSpeed(1); // Low speed
      }
    }
  }, [temperatureData, mode]);

  const handleFanToggle = () => {
    setFanStatus(!fanStatus);
  };

  const handleSpeedChange = (e) => {
    setFanSpeed(parseInt(e.target.value));
  };

  const handleModeChange = (e) => {
    setMode(e.target.value);
  };

  return (
    <div className="relative  bg-white p-4  w-80 h-80 rounded-md shadow-lg">
      <h2 className="text-lg font-bold mb-2">Fan Controller</h2>
      
      <div className="flex items-center mb-4">
        <FaFan className={`mr-2 ${fanStatus ? "text-green-500" : "text-gray-400"}`} />
        <span>Fan Status: {fanStatus ? "ON" : "OFF"}</span>
        <button
          onClick={handleFanToggle}
          className={`ml-4 py-2 px-4 rounded-md ${fanStatus ? "bg-red-500 text-white" : "bg-green-500 text-white"}`}
        >
          {fanStatus ? "Turn OFF" : "Turn ON"}
        </button>
      </div>

      {/* Mode Selection */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Mode</label>
        <select value={mode} onChange={handleModeChange} className="border rounded-md px-2 py-1">
          <option value="manual">Manual</option>
          <option value="automatic">Automatic</option>
        </select>
      </div>

      {/* Fan Speed Control (Slider) */}
      {mode === "manual" ? (
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Fan Speed</label>
          <input
            type="range"
            min="0"
            max="3"
            value={fanSpeed}
            onChange={handleSpeedChange}
            className="w-full"
            disabled={!fanStatus}
          />
          <div className="flex justify-between text-sm mt-1">
            <span>Off</span>
            <span>Low</span>
            <span>Medium</span>
            <span>High</span>
          </div>
        </div>
      ) : (
        <div className="mb-4">
          <p className="text-sm">Automatic Speed: {["Off", "Low", "Medium", "High"][autoSpeed]}</p>
        </div>
      )}
    </div>
  );
};

export default FanController;
