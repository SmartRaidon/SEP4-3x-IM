import { Link } from "react-router-dom"
import { useEffect, useState } from "react";
import { roomsApi } from "../api/roomsApi";
import { getUser } from "../../auth/utils/authStorage";
import { useCurrentMeasurements } from "../../measurements/hooks/useCurrentMeasurements";
import VerticalNavbar from "../components/VerticalNavbar";

function MainPage() {
  const [selectedRoomId, setSelectedRoomId] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [roomsError, setRoomsError] = useState(null);
  const {data, isLoading, error}  = useCurrentMeasurements(selectedRoomId);

  useEffect(() => {
    let cancel = false;
    roomsApi
      .getRooms()
      .then((result) => {
        if (!cancel) setRooms(result);
      })
      .catch((err) => {
        if (!cancel) setRoomsError(err);
      });
    return () => { cancel = true; };
  }, []);

  async function handleAddRoom(roomName) {
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

  const currentUser = getUser();
  const userId = currentUser?.id ? String(currentUser.id) : "demo-user";

  try {
    const newRoom = await roomsApi.createRoom({ userId, name: trimmedName });
    setRooms((prevRooms) => [...prevRooms, newRoom]);
    setSelectedRoomId(newRoom.id);
  } catch (err) {
    alert(`Failed to create room: ${err.message}`);
  }
}

async function handleDeleteRoom() {
  if (!selectedRoomId) {
    return;
  }

  const selectedRoom = rooms.find((room) => room.id === selectedRoomId);

  const confirmed = confirm(`Delete ${selectedRoom.name}?`);

  if (!confirmed) {
    return;
  }

  try {
    await roomsApi.deleteRoom(selectedRoomId);
    setRooms((prevRooms) =>
      prevRooms.filter((room) => room.id !== selectedRoomId)
    );
    setSelectedRoomId(null);
  } catch (err) {
    alert(`Failed to delete room: ${err.message}`);
  }
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
      <p>Temperature: {data.temperature.value} °C </p>
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

        <header className="page-header">
          <h1 className="page-title">Main page</h1>
        </header>

        {roomsError && <p>Error loading rooms: {roomsError.message}</p>}
        {renderMeasurements()}
      </main>
    </div>
  );
}

export default MainPage;
