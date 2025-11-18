import React, { useState } from 'react';

export default function WaterLeakDetector() {
  const [leakStatus, setLeakStatus] = useState('Safe'); // 'Safe' or 'Leak Detected'
  const [alertEnabled, setAlertEnabled] = useState(false);
  const [waterUsageData, setWaterUsageData] = useState([5, 12, 9, 7, 15]); // Example data for water usage

  // Handle toggle alert system
  const toggleAlertSystem = () => {
    const newState = !alertEnabled;
    setAlertEnabled(newState);
    if (newState) {
      alert("Alert system enabled. You will be notified in case of a leak.");
    } else {
      alert("Alert system disabled.");
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
    <div className="bg-white p-4 w-80 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Water Leak Detector</h2>

      {/* Leak Status */}
      <div className="mt-4 p-3 rounded-md bg-gray-50">
        <div className="flex items-center justify-between mb-2">
          <p className={`text-lg font-semibold ${leakStatus === 'Safe' ? 'text-green-600' : 'text-red-600'}`}>
            Status: {leakStatus}
          </p>
          {leakStatus === 'Leak Detected' && (
            <span className="text-2xl">⚠️</span>
          )}
        </div>
        <button
          className="w-full px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md transition-colors"
          onClick={detectLeak}
        >
          Simulate Leak Detection
        </button>
      </div>

      {/* Alert System */}
      <div className="mt-4 p-3 rounded-md bg-gray-50">
        <p className="text-sm font-medium mb-2">
          Alert System: <span className={alertEnabled ? 'text-green-600' : 'text-gray-500'}>
            {alertEnabled ? 'Enabled' : 'Disabled'}
          </span>
        </p>
        <button
          className={`w-full px-4 py-2 rounded-md transition-colors ${
            alertEnabled 
              ? 'bg-yellow-500 hover:bg-yellow-600 text-white' 
              : 'bg-gray-300 hover:bg-gray-400 text-gray-700'
          }`}
          onClick={toggleAlertSystem}
        >
          {alertEnabled ? 'Disable Alerts' : 'Enable Alerts'}
        </button>
      </div>

      {/* Water Usage Monitoring */}
      <div className="mt-4 p-3 rounded-md bg-blue-50">
        <h3 className="text-md font-semibold mb-2">Water Usage Monitoring</h3>
        <p className="text-xs text-gray-600 mb-2">Last 5 days water usage:</p>
        <ul className="space-y-1">
          {waterUsageData.map((usage, index) => (
            <li key={index} className="text-sm flex justify-between">
              <span>Day {index + 1}:</span>
              <span className="font-medium">{usage} L</span>
            </li>
          ))}
        </ul>
        <p className="text-xs text-gray-500 mt-2">
          Average: {(waterUsageData.reduce((a, b) => a + b, 0) / waterUsageData.length).toFixed(1)} L/day
        </p>
      </div>

      {/* Preventive Measures */}
      {leakStatus === 'Leak Detected' && (
        <div className="mt-4 p-3 rounded-md bg-red-50 border-2 border-red-200">
          <h3 className="text-md font-semibold text-red-600 mb-2">⚠️ Emergency Action Required</h3>
          <button
            className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md font-medium transition-colors"
            onClick={handlePreventiveAction}
          >
            Shut Off Water Supply
          </button>
        </div>
      )}
    </div>
  );
}
