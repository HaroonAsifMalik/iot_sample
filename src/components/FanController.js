import React, { useState, useEffect } from "react";
import { FaFan } from "react-icons/fa";

const FanController = ({ temperatureData = [24] }) => {
  const [fanStatus, setFanStatus] = useState(false); // Fan ON/OFF
  const [fanSpeed, setFanSpeed] = useState(0); // Fan speed (RPM or levels)
  const [mode, setMode] = useState("manual"); // Mode: manual or automatic
  const [autoSpeed, setAutoSpeed] = useState(0); // Auto-adjusted speed based on temperature

  // Set thresholds for auto mode based on temperature
  useEffect(() => {
    if (mode === "automatic" && fanStatus && temperatureData && temperatureData.length > 0) {
      const currentTemp = temperatureData[temperatureData.length - 1]; // Latest temperature
      if (currentTemp >= 30) {
        setAutoSpeed(3); // High speed
      } else if (currentTemp >= 25) {
        setAutoSpeed(2); // Medium speed
      } else {
        setAutoSpeed(1); // Low speed
      }
    } else if (mode === "automatic" && !fanStatus) {
      setAutoSpeed(0);
    }
  }, [temperatureData, mode, fanStatus]);

  const handleFanToggle = () => {
    setFanStatus(!fanStatus);
  };

  const handleSpeedChange = (e) => {
    setFanSpeed(parseInt(e.target.value));
  };

  const handleModeChange = (e) => {
    setMode(e.target.value);
  };

  const speedLabels = ["Off", "Low", "Medium", "High"];
  const currentSpeed = mode === "manual" ? fanSpeed : autoSpeed;

  return (
    <div className="relative bg-white p-4 w-80 min-h-[350px] rounded-md shadow-lg">
      <h2 className="text-lg font-bold mb-4">Fan Controller</h2>
      
      <div className="flex items-center justify-between mb-4 p-3 bg-gray-50 rounded-md">
        <div className="flex items-center">
          <FaFan className={`mr-2 text-2xl ${fanStatus ? "text-green-500 animate-spin" : "text-gray-400"}`} style={{ animationDuration: fanStatus ? `${4 - currentSpeed}s` : '0s' }} />
          <div>
            <p className="font-semibold">Status: {fanStatus ? "ON" : "OFF"}</p>
            <p className="text-sm text-gray-600">Speed: {speedLabels[currentSpeed]}</p>
          </div>
        </div>
        <button
          onClick={handleFanToggle}
          className={`py-2 px-4 rounded-md font-medium transition-colors ${
            fanStatus 
              ? "bg-red-500 hover:bg-red-600 text-white" 
              : "bg-green-500 hover:bg-green-600 text-white"
          }`}
        >
          {fanStatus ? "Turn OFF" : "Turn ON"}
        </button>
      </div>

      {/* Mode Selection */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Control Mode</label>
        <select 
          value={mode} 
          onChange={handleModeChange} 
          className="border rounded-md px-3 py-2 w-full"
          disabled={!fanStatus}
        >
          <option value="manual">Manual</option>
          <option value="automatic">Automatic</option>
        </select>
        {mode === "automatic" && (
          <p className="text-xs text-gray-500 mt-1">
            Speed adjusts automatically based on temperature
          </p>
        )}
      </div>

      {/* Fan Speed Control (Slider) */}
      {mode === "manual" ? (
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">
            Fan Speed: {speedLabels[fanSpeed]}
          </label>
          <input
            type="range"
            min="0"
            max="3"
            value={fanSpeed}
            onChange={handleSpeedChange}
            className="w-full"
            disabled={!fanStatus}
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>Off</span>
            <span>Low</span>
            <span>Medium</span>
            <span>High</span>
          </div>
        </div>
      ) : (
        <div className="mb-4 p-3 bg-blue-50 rounded-md">
          <p className="text-sm font-medium">Automatic Mode Active</p>
          <p className="text-sm text-gray-600 mt-1">
            Current Speed: <span className="font-semibold">{speedLabels[autoSpeed]}</span>
          </p>
          {temperatureData && temperatureData.length > 0 && (
            <p className="text-xs text-gray-500 mt-1">
              Temperature: {temperatureData[temperatureData.length - 1]}°C
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default FanController;
