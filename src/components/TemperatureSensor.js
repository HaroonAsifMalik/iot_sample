import React, { useState } from "react";
import { FaTemperatureHigh, FaTemperatureLow } from "react-icons/fa";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";

// Register required components
Chart.register(...registerables);

const TemperatureSensor = () => {
  const [showSettings, setShowSettings] = useState(false);
  const [unit, setUnit] = useState("Celsius");
  const [threshold, setThreshold] = useState(25); // Default threshold in Celsius
  const [currentTemp, setCurrentTemp] = useState(24);

  // Mock data for the temperature graph
  const data = {
    labels: ["0h", "1h", "2h", "3h", "4h", "5h", "6h"],
    datasets: [
      {
        label: `Temperature (°${unit === "Celsius" ? "C" : "F"})`,
        data: [22, 23, 24, 25, 26, 27, 28].map(t => unit === "Fahrenheit" ? (t * 9/5) + 32 : t),
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: false,
        title: {
          display: true,
          text: `Temperature (°${unit === "Celsius" ? "C" : "F"})`,
        },
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
    setThreshold(parseFloat(e.target.value));
  };

  const displayTemp = unit === "Fahrenheit" ? (currentTemp * 9/5) + 32 : currentTemp;
  const displayThreshold = unit === "Fahrenheit" ? (threshold * 9/5) + 32 : threshold;

  return (
    <div className="relative bg-white p-4 w-80 min-h-[400px] rounded-md shadow-lg">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-bold">Temperature Sensor</h2>
        <button
          onClick={() => setShowSettings(!showSettings)}
          className="text-sm bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded"
        >
          {showSettings ? "Close" : "Settings"}
        </button>
      </div>

      {showSettings ? (
        <div className="settings-popup p-4 bg-gray-50 rounded-md mb-4">
          <h3 className="text-md font-semibold mb-3">Sensor Settings</h3>
          <div className="mb-3">
            <label className="block text-sm font-medium mb-1">Temperature Unit</label>
            <select
              value={unit}
              onChange={handleUnitChange}
              className="border rounded-md px-2 py-1 w-full"
            >
              <option value="Celsius">Celsius (°C)</option>
              <option value="Fahrenheit">Fahrenheit (°F)</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Alert Threshold: {displayThreshold.toFixed(1)}°{unit === "Celsius" ? "C" : "F"}
            </label>
            <input
              type="number"
              value={threshold}
              onChange={handleThresholdChange}
              className="border rounded-md px-2 py-1 w-full"
              step="0.1"
            />
          </div>
          <button
            onClick={handleSaveSettings}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md w-full"
          >
            Save Settings
          </button>
        </div>
      ) : null}

      <div className="graph-container w-full h-64 p-2 bg-white rounded-md relative">
        <div className="flex items-center justify-between mb-2">
          <div>
            <p className="text-2xl font-bold">
              {displayTemp.toFixed(1)}°{unit === "Celsius" ? "C" : "F"}
            </p>
            <p className="text-xs text-gray-500">Current Temperature</p>
          </div>
          <div className="flex space-x-2">
            {currentTemp >= threshold ? (
              <FaTemperatureHigh className="text-red-500 text-xl" title="High Temperature Alert" />
            ) : (
              <FaTemperatureLow className="text-blue-500 text-xl" title="Normal Temperature" />
            )}
          </div>
        </div>
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default TemperatureSensor;
