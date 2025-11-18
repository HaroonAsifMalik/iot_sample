import React, { useState } from "react";

const mockDevices = [
  { id: 1, name: "Smart Plug", firmware: "v1.0.2" },
  { id: 2, name: "Smart Light", firmware: "v2.3.1" },
  { id: 3, name: "WiFi Module", firmware: "v1.1.0" },
];

export default function Configuration() {
  const [devices, setDevices] = useState(mockDevices);
  const [groupedDevices, setGroupedDevices] = useState({
    rooms: { LivingRoom: [], Kitchen: [] },
    scenes: { MovieNight: [], AwayMode: [] },
  });
  const [backupConfig, setBackupConfig] = useState(null);

  // Handle Firmware Update
  const handleFirmwareUpdate = (deviceId) => {
    alert(`Firmware update triggered for device with ID: ${deviceId}`);
  };

  // Handle Backup
  const handleBackup = () => {
    setBackupConfig(devices); // Backing up current devices' config
    alert("Configuration backed up!");
  };

  // Handle Restore
  const handleRestore = () => {
    if (backupConfig) {
      setDevices(backupConfig);
      alert("Configuration restored from backup!");
    } else {
      alert("No backup found!");
    }
  };

  // Handle Device Grouping (for rooms and scenes)
  const handleGroupDevice = (deviceId, groupType, groupName) => {
    setGroupedDevices((prev) => {
      const newGroup = { ...prev[groupType], [groupName]: [...prev[groupType][groupName], deviceId] };
      return { ...prev, [groupType]: newGroup };
    });
  };

  return (
    <div className="bg-white p-4 w-80 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Configuration Panel</h2>

      {/* Settings Panel */}
      <div className="mt-4 p-3 bg-gray-50 rounded-md">
        <h3 className="text-md font-semibold mb-3">Connected Devices</h3>
        <ul className="space-y-2">
          {devices.map((device) => (
            <li key={device.id} className="flex items-center justify-between p-2 bg-white rounded border">
              <div>
                <p className="text-sm font-medium">{device.name}</p>
                <p className="text-xs text-gray-500">Firmware: {device.firmware}</p>
              </div>
              <button
                className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-md text-xs font-medium transition-colors"
                onClick={() => handleFirmwareUpdate(device.id)}
              >
                Update
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Device Grouping */}
      <div className="mt-4 p-3 bg-gray-50 rounded-md">
        <h3 className="text-md font-semibold mb-3">Device Grouping</h3>
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium mb-1">Select Device</label>
            <select className="border rounded-md p-2 w-full text-sm">
              {devices.map((device) => (
                <option key={device.id} value={device.id}>{device.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Group Type</label>
            <select className="border rounded-md p-2 w-full text-sm">
              <option value="rooms">Room</option>
              <option value="scenes">Scene</option>
            </select>
          </div>
        </div>

        <div className="mt-4">
          <h4 className="text-sm font-semibold mb-2">Grouped Devices</h4>
          <div className="space-y-2">
            <div>
              <p className="text-xs font-medium text-gray-600 mb-1">Rooms:</p>
              <ul className="space-y-1">
                {Object.keys(groupedDevices.rooms).map((room) => (
                  <li key={room} className="text-xs bg-white p-2 rounded border">
                    {room}: <span className="font-medium">{groupedDevices.rooms[room].length}</span> device(s)
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-2">
              <p className="text-xs font-medium text-gray-600 mb-1">Scenes:</p>
              <ul className="space-y-1">
                {Object.keys(groupedDevices.scenes).map((scene) => (
                  <li key={scene} className="text-xs bg-white p-2 rounded border">
                    {scene}: <span className="font-medium">{groupedDevices.scenes[scene].length}</span> device(s)
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Backup & Restore */}
      <div className="mt-4 p-3 bg-gray-50 rounded-md">
        <h3 className="text-md font-semibold mb-3">Backup & Restore</h3>
        <div className="space-y-2">
          <button
            className="w-full px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md font-medium transition-colors"
            onClick={handleBackup}
          >
            Backup Settings
          </button>
          <button
            className="w-full px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-md font-medium transition-colors"
            onClick={handleRestore}
            disabled={!backupConfig}
          >
            Restore Settings
          </button>
          {backupConfig && (
            <p className="text-xs text-gray-500 text-center mt-2">Backup available</p>
          )}
        </div>
      </div>
    </div>
  );
}
