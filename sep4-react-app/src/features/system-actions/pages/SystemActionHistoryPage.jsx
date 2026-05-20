import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSystemActions } from "../hooks/useSystemActions";
import SystemActionsFilters from "../components/SystemActionsFilters";
import SystemActionsTable from "../components/SystemActionsTable";

function SystemActionHistoryPage() {
  const { roomId: roomIdParam } = useParams();
  const roomId = Number(roomIdParam);
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
    <div className="actions-page">
      <h1 className="actions-title">Action History — Room {roomId}</h1>

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

      <Link to="/main">
        <button className="nav-btn">Home</button>
      </Link>
    </div>
  );
}

export default SystemActionHistoryPage;
