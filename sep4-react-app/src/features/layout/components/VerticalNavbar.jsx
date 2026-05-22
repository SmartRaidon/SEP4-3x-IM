import { useState } from "react";

function VerticalNavbar({ rooms, selectedRoomId, onSelectRoom, onAddRoom, onDeleteRoom }) 
  { const [isAddingRoom, setIsAddingRoom] = useState(false);
    const [newRoomName, setNewRoomName] = useState("");


    function handleSubmit(event) {
    event.preventDefault();
    onAddRoom(newRoomName);
    setNewRoomName("");
    setIsAddingRoom(false);
  }

  return (

    <nav className="vertical-navbar">
      <div className="navbar-header">
      <h2 className="navbar-title">Rooms</h2>
      <button 
      className="icon-btn add-room-btn" onClick={() => setIsAddingRoom(true)}>
        +
      </button>
      </div>

       {isAddingRoom && (
        <form className="add-room-form" onSubmit={handleSubmit}>
          <input
            className="add-room-input"
            type="text"
            value={newRoomName}
            onChange={(event) => setNewRoomName(event.target.value)}
            placeholder="Room name"
          />

          <button className="add-room-submit-btn" type="submit">
            Add
          </button>
        </form>
      )}

      <div className="room-list">
        {rooms.map((room) => (
          <button
            key={room.id}
            className={
              selectedRoomId === room.id
                ? "room-nav-item active"
                : "room-nav-item"
            }
            onClick={() => onSelectRoom(room.id)}
          >
            {room.name}
          </button>
        ))}
      </div>

      {selectedRoomId && (
        <button className="delete-room-btn" onClick={onDeleteRoom} title="Delete Room">
       Delete Room
        </button>
      )}

      
    </nav>
  );
}

export default VerticalNavbar;