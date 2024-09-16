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
    <div className="bg-gray-100 p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-bold">Configuration Panel</h2>

      {/* Settings Panel */}
      <div className="mt-4">
        <h3 className="text-lg font-semibold">Connected Devices:</h3>
        <ul className="list-disc list-inside">
          {devices.map((device) => (
            <li key={device.id} className="mt-2">
              {device.name} (Firmware: {device.firmware})
              <button
                className="ml-4 px-2 py-1 bg-blue-500 text-white rounded-md"
                onClick={() => handleFirmwareUpdate(device.id)}
              >
                Update Firmware
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Device Grouping */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold">Group Devices:</h3>
        <div className="mt-2">
          <label className="block">
            Select Group Type:
            <select
              className="border rounded p-1 mt-1"
              onChange={(e) => {
                const deviceId = devices[0].id; // Simulating grouping the first device for now
                handleGroupDevice(deviceId, e.target.value, "LivingRoom");
              }}
            >
              <option value="rooms">Room</option>
              <option value="scenes">Scene</option>
            </select>
          </label>
        </div>

        <div className="mt-4">
          <h4 className="text-md font-semibold">Grouped Devices:</h4>
          <p>Rooms:</p>
          <ul className="list-inside list-disc">
            {Object.keys(groupedDevices.rooms).map((room) => (
              <li key={room}>
                {room}: {groupedDevices.rooms[room].length} devices
              </li>
            ))}
          </ul>

          <p className="mt-2">Scenes:</p>
          <ul className="list-inside list-disc">
            {Object.keys(groupedDevices.scenes).map((scene) => (
              <li key={scene}>
                {scene}: {groupedDevices.scenes[scene].length} devices
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Backup & Restore */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold">Backup & Restore Configuration:</h3>
        <div className="mt-2">
          <button
            className="px-4 py-2 bg-green-500 text-white rounded-md"
            onClick={handleBackup}
          >
            Backup Settings
          </button>
          <button
            className="ml-4 px-4 py-2 bg-yellow-500 text-white rounded-md"
            onClick={handleRestore}
          >
            Restore Settings
          </button>
        </div>
      </div>
    </div>
  );
}
