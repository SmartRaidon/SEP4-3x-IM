import { Link } from "react-router-dom"
import { useState } from "react";
import {rooms} from "../mocks/rooms.mock";
import { useCurrentMeasurements } from "../hooks/useCurrentMeasurements";
import VerticalNavbar from "../components/VerticalNavbar";
function MainPage() {
  const [selectedRoomId, setSelectedRoomId] = useState(null);
  const {data, isLoading, error}  = useCurrentMeasurements(selectedRoomId);
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
      />

      <main className="main-page">
        <div className="top-nav">
          <Link to="/comfort-zone">
            <button className="main-page-nav-btn">Comfort Zone</button>
          </Link>

          {selectedRoomId ? (
            <Link to={`/view-data/${selectedRoomId}`}>
              <button className="main-page-nav-btn">View Data</button>
            </Link>
          ) : (
            <button className="main-page-nav-btn" disabled>
              View Data
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