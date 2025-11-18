import React, { useState, useEffect } from 'react';

export default function SmartPlug() {
  const [isOn, setIsOn] = useState(false);
  const [powerConsumption, setPowerConsumption] = useState(0); // In watts
  const [energyUsage, setEnergyUsage] = useState(0); // Total energy in kWh
  const [schedule, setSchedule] = useState({ onTime: '', offTime: '' });
  const [overloadAlert, setOverloadAlert] = useState(false);
  const overloadThreshold = 1000; // Example threshold of 1000W

  // Simulate real-time power consumption
  useEffect(() => {
    if (isOn) {
      const interval = setInterval(() => {
        const consumption = Math.random() * 900 + 100; // Random watts between 100 and 1000
        setPowerConsumption(consumption);
        // Convert watts to kWh per second (divide by 1000 for kW, then by 3600 for hours)
        setEnergyUsage((prevUsage) => prevUsage + consumption / 3600000); // kWh calculation
        if (consumption > overloadThreshold) {
          setOverloadAlert(true);
        } else {
          setOverloadAlert(false);
        }
      }, 1000);

      return () => clearInterval(interval);
    } else {
      setPowerConsumption(0);
    }
  }, [isOn]);

  // Handle power toggle
  const handleToggle = () => {
    setIsOn((prevState) => !prevState);
  };

  // Handle scheduling
  const handleScheduleChange = (e) => {
    const { name, value } = e.target;
    setSchedule({ ...schedule, [name]: value });
  };

  const applySchedule = () => {
    alert(`Smart Plug will turn ON at ${schedule.onTime} and OFF at ${schedule.offTime}`);
  };

  return (
    <div className="bg-white p-4 w-80 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Smart Plug</h2>

      {/* Power Control */}
      <div className="mt-4">
        <p className="text-lg font-semibold mb-2">Power Control</p>
        <label className="inline-flex items-center mt-2 cursor-pointer">
          <span className={`mr-3 font-medium ${!isOn ? 'text-gray-700' : 'text-gray-400'}`}>OFF</span>
          <div className="relative">
            <input
              type="checkbox"
              className="sr-only"
              checked={isOn}
              onChange={handleToggle}
            />
            <div className={`w-14 h-7 rounded-full transition-colors ${
              isOn ? 'bg-green-500' : 'bg-gray-300'
            }`}>
              <div className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform ${
                isOn ? 'translate-x-7' : 'translate-x-1'
              } mt-0.5`}></div>
            </div>
          </div>
          <span className={`ml-3 font-medium ${isOn ? 'text-gray-700' : 'text-gray-400'}`}>ON</span>
        </label>
      </div>

      {/* Energy Monitoring */}
      <div className="mt-4 p-3 bg-blue-50 rounded-md">
        <p className="text-lg font-semibold mb-2">Energy Monitoring</p>
        <div className="space-y-1">
          <p className="text-sm">
            <span className="font-medium">Power:</span> {powerConsumption.toFixed(2)} W
          </p>
          <p className="text-sm">
            <span className="font-medium">Total Energy:</span> {energyUsage.toFixed(4)} kWh
          </p>
          <p className="text-xs text-gray-500 mt-2">
            Estimated Cost: ${(energyUsage * 0.12).toFixed(4)} (at $0.12/kWh)
          </p>
        </div>
      </div>

      {/* Overload Alerts */}
      {overloadAlert && (
        <div className="mt-4 bg-red-100 border-2 border-red-300 text-red-700 p-3 rounded-md">
          <p className="font-semibold">⚠️ Overload Alert!</p>
          <p className="text-sm mt-1">Power consumption exceeds {overloadThreshold}W threshold.</p>
        </div>
      )}

      {/* Schedule and Timers */}
      <div className="mt-4 p-3 bg-gray-50 rounded-md">
        <p className="text-md font-semibold mb-2">Schedule & Timer</p>
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium mb-1">On Time</label>
            <input
              type="time"
              name="onTime"
              value={schedule.onTime}
              onChange={handleScheduleChange}
              className="border rounded-md p-2 w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Off Time</label>
            <input
              type="time"
              name="offTime"
              value={schedule.offTime}
              onChange={handleScheduleChange}
              className="border rounded-md p-2 w-full"
            />
          </div>
          <button
            className="w-full mt-3 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md font-medium transition-colors"
            onClick={applySchedule}
            disabled={!schedule.onTime || !schedule.offTime}
          >
            Apply Schedule
          </button>
        </div>
      </div>
    </div>
  );
}
