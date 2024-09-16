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
        setEnergyUsage((prevUsage) => prevUsage + consumption / 1000); // kWh calculation
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
    <div className="bg-blue-100 p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-bold">Smart Plug</h2>

      {/* Power Control */}
      <div className="mt-4">
        <p className="text-lg">Power Control:</p>
        <label className="inline-flex items-center mt-2">
          <span className="mr-2">OFF</span>
          <input
            type="checkbox"
            className="toggle-checkbox"
            checked={isOn}
            onChange={handleToggle}
          />
          <span className="ml-2">ON</span>
        </label>
      </div>

      {/* Energy Monitoring */}
      <div className="mt-4">
        <p className="text-lg">Energy Monitoring:</p>
        <p>Real-time Power Consumption: {powerConsumption.toFixed(2)} W</p>
        <p>Total Energy Usage: {energyUsage.toFixed(2)} kWh</p>
      </div>

      {/* Overload Alerts */}
      {overloadAlert && (
        <div className="mt-4 bg-red-100 text-red-600 p-2 rounded-md">
          <p>⚠️ Overload Alert! Power consumption exceeds {overloadThreshold}W.</p>
        </div>
      )}

      {/* Schedule and Timers */}
      <div className="mt-4">
        <p className="text-lg">Schedule and Timers:</p>
        <div className="mt-2">
          <label className="block">
            On Time:
            <input
              type="time"
              name="onTime"
              value={schedule.onTime}
              onChange={handleScheduleChange}
              className="border rounded p-1 mt-1"
            />
          </label>
          <label className="block mt-2">
            Off Time:
            <input
              type="time"
              name="offTime"
              value={schedule.offTime}
              onChange={handleScheduleChange}
              className="border rounded p-1 mt-1"
            />
          </label>
          <button
            className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-md"
            onClick={applySchedule}
          >
            Apply Schedule
          </button>
        </div>
      </div>
    </div>
  );
}
