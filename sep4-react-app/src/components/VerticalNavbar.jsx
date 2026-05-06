import { Link } from "react-router-dom";

function VerticalNavbar({ rooms, selectedRoomId, onSelectRoom }) {
  return (
    <nav className="vertical-navbar">
      <h2 className="navbar-title">Rooms</h2>

      <div className="room-list">
        {rooms.map((room) => (
          <button
            key={room.id}
            className={
              Number(selectedRoomId) === room.id
                ? "room-nav-item active"
                : "room-nav-item"
            }
            onClick={() => onSelectRoom(room.id)}
          >
            {room.name}
          </button>
        ))}
      </div>

      
    </nav>
  );
}

export default VerticalNavbar;