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
    <div className="bg-white p-4 w-80 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">WiFi Module</h2>

      {/* Connection Status */}
      <div className="mt-4 p-3 bg-gray-50 rounded-md">
        <div className="flex items-center justify-between mb-2">
          <p className={`text-lg font-semibold ${connectionStatus === 'Connected' ? 'text-green-600' : connectionStatus === 'Reconnecting...' ? 'text-yellow-600' : 'text-red-600'}`}>
            Status: {connectionStatus}
          </p>
          {connectionStatus === 'Connected' && (
            <span className="text-green-500 text-xl">●</span>
          )}
        </div>
        <p className="text-sm mb-2">Signal Strength: {signalStrength}%</p>
        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          {connectionStatus === 'Connected' && signalStrength > 50 && (
            <div 
              className="bg-green-500 h-full rounded-full transition-all duration-300"
              style={{ width: `${signalStrength}%` }}
            ></div>
          )}
          {connectionStatus === 'Connected' && signalStrength <= 50 && (
            <div 
              className="bg-yellow-500 h-full rounded-full transition-all duration-300"
              style={{ width: `${signalStrength}%` }}
            ></div>
          )}
          {connectionStatus === 'Disconnected' && (
            <div className="bg-red-500 h-full rounded-full w-full"></div>
          )}
        </div>
      </div>

      {/* Network Information */}
      <div className="mt-4 p-3 bg-gray-50 rounded-md">
        <h3 className="text-md font-semibold mb-2">Network Information</h3>
        <div className="space-y-1 text-sm">
          <p><span className="font-medium">SSID:</span> {networkInfo.SSID}</p>
          <p><span className="font-medium">IP Address:</span> {networkInfo.IP}</p>
          <p><span className="font-medium">MAC Address:</span> <span className="font-mono text-xs">{networkInfo.MAC}</span></p>
        </div>
      </div>

      {/* Connected Devices */}
      <div className="mt-4 p-3 bg-gray-50 rounded-md">
        <h3 className="text-md font-semibold mb-2">Connected Devices ({connectedDevices.length})</h3>
        <ul className="space-y-2">
          {connectedDevices.map((device, index) => (
            <li key={index} className="flex items-center justify-between text-sm">
              <span>{device.name}</span>
              <span className={`px-2 py-1 rounded text-xs font-medium ${
                device.status === 'Online' 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-red-100 text-red-700'
              }`}>
                {device.status}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Reconnect/Reset Controls */}
      <div className="mt-4 space-y-2">
        <button
          className="w-full px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md font-medium transition-colors"
          onClick={handleReconnect}
          disabled={connectionStatus === 'Reconnecting...'}
        >
          {connectionStatus === 'Reconnecting...' ? 'Reconnecting...' : 'Reconnect WiFi'}
        </button>
        <button
          className="w-full px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md font-medium transition-colors"
          onClick={handleReset}
        >
          Reset WiFi Module
        </button>
      </div>
    </div>
  );
}
