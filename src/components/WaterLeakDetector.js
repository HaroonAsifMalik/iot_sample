import React, { useState } from 'react';

export default function WaterLeakDetector() {
  const [leakStatus, setLeakStatus] = useState('Safe'); // 'Safe' or 'Leak Detected'
  const [alertEnabled, setAlertEnabled] = useState(false);
  const [waterUsageData, setWaterUsageData] = useState([5, 12, 9, 7, 15]); // Example data for water usage

  // Handle toggle alert system
  const toggleAlertSystem = () => {
    setAlertEnabled(!alertEnabled);
    if (alertEnabled) {
      alert("Alert system enabled. You will be notified in case of a leak.");
    }
  };

  // Simulate leak detection (for demo purposes)
  const detectLeak = () => {
    setLeakStatus('Leak Detected');
    if (alertEnabled) {
      alert("Leak detected! Notifications have been sent.");
    }
  };

  // Handle preventive actions
  const handlePreventiveAction = () => {
    alert("Shutting off the water supply to prevent further damage.");
  };

  return (
    <div className="bg-blue-200 p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-bold">Water Leak Detector</h2>

      {/* Leak Status */}
      <div className="mt-4">
        <p className={`text-lg ${leakStatus === 'Safe' ? 'text-green-600' : 'text-red-600'}`}>
          Leak Status: {leakStatus}
        </p>
        <button
          className="mt-2 px-4 py-2 bg-red-500 text-white rounded-md"
          onClick={detectLeak}
        >
          Simulate Leak Detection
        </button>
      </div>

      {/* Alert System */}
      <div className="mt-4">
        <p className="text-lg">Alert System: {alertEnabled ? 'Enabled' : 'Disabled'}</p>
        <button
          className="mt-2 px-4 py-2 bg-yellow-500 text-white rounded-md"
          onClick={toggleAlertSystem}
        >
          {alertEnabled ? 'Disable Alerts' : 'Enable Alerts'}
        </button>
      </div>

      {/* Water Usage Monitoring */}
      <div className="mt-4">
        <h3 className="text-lg">Water Usage Monitoring:</h3>
        <p className="text-sm">Last 5 days water usage (in liters):</p>
        <ul className="mt-2">
          {waterUsageData.map((usage, index) => (
            <li key={index} className="text-blue-700">
              Day {index + 1}: {usage} liters
            </li>
          ))}
        </ul>
      </div>

      {/* Preventive Measures */}
      {leakStatus === 'Leak Detected' && (
        <div className="mt-4">
          <h3 className="text-lg text-red-600">Preventive Measures:</h3>
          <button
            className="mt-2 px-4 py-2 bg-gray-800 text-white rounded-md"
            onClick={handlePreventiveAction}
          >
            Shut Off Water Supply
          </button>
        </div>
      )}
    </div>
  );
}
