import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useSystemActions } from "../hooks/useSystemActions";
import SystemActionsFilters from "../components/SystemActionsFilters";
import SystemActionsTable from "../components/SystemActionsTable";
import { roomsApi } from "../../layout/api/roomsApi";

function SystemActionHistoryPage() {
  const { roomId } = useParams();
  const [roomName, setRoomName] = useState(null);

  useEffect(() => {
    let cancel = false;
    roomsApi
      .getRooms()
      .then((list) => {
        if (cancel) return;
        const match = list.find((r) => r.id === roomId);
        setRoomName(match?.name ?? `Room ${roomId}`);
      })
      .catch(() => {
        if (!cancel) setRoomName(`Room ${roomId}`);
      });
    return () => { cancel = true; };
  }, [roomId]);

  const { data, isLoading, error } = useSystemActions(roomId);

  const [deviceTypeFilter, setDeviceTypeFilter] = useState("all");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const filteredActions = useMemo(() => {
    if (!data) return [];
    const fromMs = from ? new Date(from).getTime() : null;
    const toMs = to ? new Date(to).getTime() : null;

    return data.filter((action) => {
      if (deviceTypeFilter !== "all" && action.deviceType !== deviceTypeFilter) {
        return false;
      }
      const ts = new Date(action.timestampUtc).getTime();
      if (fromMs !== null && ts < fromMs) return false;
      if (toMs !== null && ts > toMs) return false;
      return true;
    });
  }, [data, deviceTypeFilter, from, to]);

  return (
    <div className="page actions-page">
      <header className="page-header">
        <h1 className="page-title">Action History</h1>
        <p className="page-subtitle">{roomName}</p>
      </header>

      <SystemActionsFilters
        deviceTypeFilter={deviceTypeFilter}
        onDeviceTypeChange={setDeviceTypeFilter}
        from={from}
        onFromChange={setFrom}
        to={to}
        onToChange={setTo}
      />

      {isLoading && <p>Loading actions...</p>}
      {error && <p>Error: {error.message}</p>}
      {!isLoading && !error && <SystemActionsTable rows={filteredActions} />}
    </div>
  );
}

export default SystemActionHistoryPage;
