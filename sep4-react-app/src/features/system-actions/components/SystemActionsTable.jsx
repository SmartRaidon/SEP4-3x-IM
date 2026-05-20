function formatTime(iso) {
  return new Date(iso).toLocaleString();
}

function SystemActionsTable({ rows }) {
  if (!rows || rows.length === 0) {
    return <p>No actions to display.</p>;
  }

  return (
    <div className="actions-table">
      <div className="actions-row actions-row-header">
        <span>Time</span>
        <span>Device</span>
        <span>Change</span>
      </div>
      {rows.map((row) => (
        <div className="actions-row" key={row.id}>
          <span>{formatTime(row.timestampUtc)}</span>
          <span>{row.deviceType}</span>
          <span>
            {row.previousState ?? "—"} → {row.newState}
          </span>
        </div>
      ))}
    </div>
  );
}

export default SystemActionsTable;
