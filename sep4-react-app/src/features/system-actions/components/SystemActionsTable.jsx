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
          <span className="actions-cell-time">{formatTime(row.timestampUtc)}</span>
          <span className="actions-cell-device">{row.deviceType}</span>
          <span className="actions-cell-change">
            <span className="actions-chip actions-chip-prev">{row.previousState ?? "—"}</span>
            <span className="actions-arrow">→</span>
            <span className="actions-chip actions-chip-new">{row.newState}</span>
          </span>
        </div>
      ))}
    </div>
  );
}

export default SystemActionsTable;
