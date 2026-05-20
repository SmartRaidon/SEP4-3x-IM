import { DEVICE_TYPES } from "../constants/deviceActions";

function SystemActionsFilters({
  deviceTypeFilter,
  onDeviceTypeChange,
  from,
  onFromChange,
  to,
  onToChange,
}) {
  return (
    <div className="actions-filters">
      <label>
        Device:
        <select
          value={deviceTypeFilter}
          onChange={(e) => onDeviceTypeChange(e.target.value)}
        >
          <option value="all">All</option>
          {Object.values(DEVICE_TYPES).map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </label>

      <label>
        From:
        <input
          type="datetime-local"
          value={from}
          onChange={(e) => onFromChange(e.target.value)}
        />
      </label>

      <label>
        To:
        <input
          type="datetime-local"
          value={to}
          onChange={(e) => onToChange(e.target.value)}
        />
      </label>
    </div>
  );
}

export default SystemActionsFilters;
