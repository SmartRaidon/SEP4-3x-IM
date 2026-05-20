import { Link } from "react-router-dom"
import { useState } from "react";
import {rooms as initialRooms} from "../mocks/rooms.mock";
import { useCurrentMeasurements } from "../../measurements/hooks/useCurrentMeasurements";
import VerticalNavbar from "../components/VerticalNavbar";

function MainPage() {
  const [selectedRoomId, setSelectedRoomId] = useState(null);
  const [rooms, setRooms] = useState(initialRooms);
  const {data, isLoading, error}  = useCurrentMeasurements(selectedRoomId);
  function handleAddRoom(roomName) {
  if (!roomName || roomName.trim() === "") {
    return;
  }

  const trimmedName = roomName.trim();

  const roomAlreadyExists = rooms.some(
    (room) => room.name.toLowerCase() === trimmedName.toLowerCase()
  );

  if (roomAlreadyExists) {
    alert("Room name already exists.");
    return;
  }

  const newRoom = {
    id: Date.now(),
    name: trimmedName,
  };

  setRooms((prevRooms) => [...prevRooms, newRoom]);
  setSelectedRoomId(newRoom.id);
}

function handleDeleteRoom() {
  if (!selectedRoomId) {
    return;
  }

  const selectedRoom = rooms.find((room) => room.id === selectedRoomId);

  const confirmed = confirm(`Delete ${selectedRoom.name}?`);

  if (!confirmed) {
    return;
  }

  setRooms((prevRooms) =>
    prevRooms.filter((room) => room.id !== selectedRoomId)
  );

  setSelectedRoomId(null);
}

  function renderMeasurements() {
  if (!selectedRoomId) {
    return <p>Select a room to see current measurements.</p>;
  }
  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Error: {error.message}</p>;
  }
  if (!data) {
    return null;     //should never happen
  }
  return (
    <div>
      <p>Temperature: {data.temperature.value} Â°C </p>
      <p>Humidity: {data.humidity.value} %</p>
      <p>Light: {data.light.value} lx</p>
    </div>
  );
}

   return (
    <div className="main-page-layout">
      <VerticalNavbar
        rooms={rooms}
        selectedRoomId={selectedRoomId}
        onSelectRoom={setSelectedRoomId}
        onAddRoom={handleAddRoom}
        onDeleteRoom={handleDeleteRoom}
      />

      <main className="main-page">
        <div className="top-nav">
          {selectedRoomId ? (
            <Link to={`/comfort-zone/${selectedRoomId}`}>
              <button className="main-page-nav-btn">Comfort Zone</button>
            </Link>
          ) : (
            <button className="main-page-nav-btn" disabled>
              Comfort Zone
            </button>
          )}

          {selectedRoomId ? (
            <Link to={`/view-data/${selectedRoomId}`}>
              <button className="main-page-nav-btn">View Data</button>
            </Link>
          ) : (
            <button className="main-page-nav-btn" disabled>
              View Data
            </button>
          )}

          {selectedRoomId ? (
            <Link to={`/system-actions/${selectedRoomId}`}>
              <button className="main-page-nav-btn">Action History</button>
            </Link>
          ) : (
            <button className="main-page-nav-btn" disabled>
              Action History
            </button>
          )}
        </div>

        <h1>Main page</h1>

        {renderMeasurements()}
      </main>
    </div>
  );
}

export default MainPage;