import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  ResponsiveContainer,
  Cell,
} from "recharts";

const COMFORT_BOUNDS = {
  temperature: { min: 20, max: 24 },
  humidity: { min: 30, max: 60 },
  light: { min: 200, max: 500 },
};

const colorType = {
  temperature: "#e63946",
  humidity: "#1d4ed8",
  light: "#608b1b",
};

function inZone(value, bounds) {
  return value >= bounds.min && value <= bounds.max;
}

function MetricBarChart({ value }) {
  const bounds = COMFORT_BOUNDS[value.type];
  const data = [
    { label: "Current", v: value.currentValue, inZone: inZone(value.currentValue, bounds) },
    { label: "Predicted", v: value.predictedValue, inZone: inZone(value.predictedValue, bounds) },
  ];

  const allValues = [value.currentValue, value.predictedValue, bounds.min, bounds.max];
  const padding = (Math.max(...allValues) - Math.min(...allValues)) * 0.25 || 1;
  const domain = [
    Math.max(0, Math.min(...allValues) - padding),
    Math.max(...allValues) + padding,
  ];

  return (
    <div style={{ flex: 1, minWidth: 0 }}>
      <h3>{value.label}</h3>
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 10 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="label" />
          <YAxis domain={domain} unit={value.unit} />
          <Tooltip
            formatter={(v) => [`${v} ${value.unit}`, value.label]}
          />
          <ReferenceLine
            y={bounds.min}
            stroke="#16a34a"
            strokeDasharray="4 4"
            label={{ value: `min ${bounds.min}${value.unit}`, position: "insideBottomLeft", fontSize: 11, fill: "#16a34a" }}
          />
          <ReferenceLine
            y={bounds.max}
            stroke="#dc2626"
            strokeDasharray="4 4"
            label={{ value: `max ${bounds.max}${value.unit}`, position: "insideTopLeft", fontSize: 11, fill: "#dc2626" }}
          />
          <Bar dataKey="v" name={value.label}>
            {data.map((entry, idx) => (
              <Cell
                key={idx}
                fill={entry.inZone ? colorType[value.type] : "#dc2626"}
                opacity={entry.label === "Current" ? 0.55 : 1}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

function ComfortZoneChart({ scenario }) {
  return (
    <div>
      <h2>Comfort zone — Now vs +{scenario.predictionHoursAhead}h</h2>
      <div className="comfort-zone-charts" style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
        {scenario.values.map((value) => (
          <MetricBarChart key={value.type} value={value} />
        ))}
      </div>
    </div>
  );
}

export default ComfortZoneChart;
