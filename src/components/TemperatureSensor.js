import React, { useState } from "react";
import { FaTemperatureHigh, FaTemperatureLow } from "react-icons/fa";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";

// Register required components
Chart.register(...registerables);

const TemperatureSensor = () => {
  const [showSettings, setShowSettings] = useState(true);
  const [unit, setUnit] = useState("Celsius");
  const [threshold, setThreshold] = useState(25); // Default threshold in Celsius

  // Mock data for the temperature graph
  const data = {
    labels: ["0h", "1h", "2h", "3h", "4h", "5h", "6h"],
    datasets: [
      {
        label: "Temperature",
        data: [22, 23, 24, 25, 26, 27, 28],
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
      },
    ],
  };

  const options = {
    scales: {
      y: {
        type: "linear", // Specify the type of scale
        beginAtZero: true,
      },
    },
  };

  const handleSaveSettings = () => {
    setShowSettings(false);
  };

  const handleUnitChange = (e) => {
    setUnit(e.target.value);
  };

  const handleThresholdChange = (e) => {
    setThreshold(e.target.value);
  };

  return (
    <div className="relative bg-white p-4  w-80 h-80 rounded-md shadow-lg">
      {showSettings ? (
        <div className="settings-popup p-4 bg-gray-100  rounded-md">
          <h2 className="text-lg font-bold mb-2">
            Temperature Sensor Settings
          </h2>
          <div className="mb-2">
            <label className="block text-sm font-medium mb-1">Unit</label>
            <select
              value={unit}
              onChange={handleUnitChange}
              className="border rounded-md px-2 py-1"
            >
              <option value="Celsius">Celsius</option>
              <option value="Fahrenheit">Fahrenheit</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Threshold</label>
            <input
              type="number"
              value={threshold}
              onChange={handleThresholdChange}
              className="border rounded-md px-2 py-1 w-full"
            />
          </div>
          <button
            onClick={handleSaveSettings}
            className="bg-blue-500 text-white py-2 px-4 rounded-md"
          >
            Save Settings
          </button>
        </div>
      ) : (
        <div className="graph-container w-full h-full p-4 bg-white shadow-md rounded-md relative">
        <h2 className="text-sm font-bold mb-2">Temperature Graph</h2>
        <Line data={data} options={options} className="w-full h-full" />
        <div className="absolute top-2 right-2 cursor-pointer flex space-x-2">
          <FaTemperatureHigh className="text-red-500" title="High Temperature" />
          <FaTemperatureLow className="text-blue-500" title="Low Temperature" />
        </div>
      </div>
      )}
    </div>
  );
};

export default TemperatureSensor;
