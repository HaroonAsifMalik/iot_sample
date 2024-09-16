import React, { useState } from 'react';

export default function WiFiModule() {
  // State to store the connection status
  const [connectionStatus, setConnectionStatus] = useState('Connected');
  const [signalStrength, setSignalStrength] = useState(75); // Percentage (0 to 100)
  const [networkInfo] = useState({
    SSID: 'Home_WiFi',
    IP: '192.168.1.100',
    MAC: '00:1A:2B:3C:4D:5E',
  });
  const [connectedDevices, setConnectedDevices] = useState([
    { name: 'Smart Light', status: 'Online' },
    { name: 'Thermostat', status: 'Online' },
    { name: 'Smart Door Lock', status: 'Offline' },
  ]);

  // Handle reconnection
  const handleReconnect = () => {
    alert('Reconnecting to WiFi...');
    setConnectionStatus('Reconnecting...');
    setTimeout(() => {
      setConnectionStatus('Connected');
      alert('WiFi reconnected successfully.');
    }, 2000);
  };

  // Handle reset
  const handleReset = () => {
    alert('Resetting WiFi module...');
    setConnectionStatus('Disconnected');
    setSignalStrength(0);
  };

  return (
    <div className="bg-green-200 p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-bold">WiFi Module</h2>

      {/* Connection Status */}
      <div className="mt-4">
        <p className={`text-lg ${connectionStatus === 'Connected' ? 'text-green-600' : 'text-red-600'}`}>
          Connection Status: {connectionStatus}
        </p>
        <p>Signal Strength: {signalStrength}%</p>
        {connectionStatus === 'Connected' && signalStrength > 50 && (
          <div className="bg-green-400 h-2 w-full rounded"></div>
        )}
        {connectionStatus === 'Connected' && signalStrength <= 50 && (
          <div className="bg-yellow-400 h-2 w-full rounded"></div>
        )}
        {connectionStatus === 'Disconnected' && (
          <div className="bg-red-400 h-2 w-full rounded"></div>
        )}
      </div>

      {/* Network Information */}
      <div className="mt-4">
        <h3 className="text-lg">Network Information:</h3>
        <p>SSID: {networkInfo.SSID}</p>
        <p>IP Address: {networkInfo.IP}</p>
        <p>MAC Address: {networkInfo.MAC}</p>
      </div>

      {/* Connected Devices */}
      <div className="mt-4">
        <h3 className="text-lg">Connected Devices:</h3>
        <ul className="list-disc ml-5">
          {connectedDevices.map((device, index) => (
            <li key={index} className={`mt-2 ${device.status === 'Online' ? 'text-green-600' : 'text-red-600'}`}>
              {device.name}: {device.status}
            </li>
          ))}
        </ul>
      </div>

      {/* Reconnect/Reset Controls */}
      <div className="mt-4">
        <button
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md"
          onClick={handleReconnect}
        >
          Reconnect WiFi
        </button>
        <button
          className="mt-2 px-4 py-2 bg-red-500 text-white rounded-md ml-4"
          onClick={handleReset}
        >
          Reset WiFi Module
        </button>
      </div>
    </div>
  );
}
