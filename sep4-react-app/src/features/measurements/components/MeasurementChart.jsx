import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { timeFormat } from "../utils/timeFormat";

const allTypes = ["Temperature", "Humidity", "Light"];
const unitByType = { Temperature: "°C", Humidity: "%", Light: "lx" };
const colorType = {
  Temperature: "#e63946",
  Humidity: "#1d4ed8",
  Light: "#608b1b",
};

const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);

function MeasurementChart({ type, data }) {
  if (type === "All") {
    return (
      <div>
        <h2>All measurements</h2>
        <ResponsiveContainer width="100%" height={360}>
          <LineChart data={data} margin={{ top: 10, right: 30, left: 10, bottom: 10 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="timeStamp" tickFormatter={timeFormat} />
            <YAxis
              yAxisId="Temperature"
              orientation="left"
              stroke={colorType.Temperature}
              unit="°C"
              width={55}
            />
            <YAxis
              yAxisId="Humidity"
              orientation="left"
              stroke={colorType.Humidity}
              unit="%"
              width={45}
            />
            <YAxis
              yAxisId="Light"
              orientation="right"
              stroke={colorType.Light}
              unit=" lx"
              width={60}
            />
            <Tooltip
              labelFormatter={(time) => new Date(time).toLocaleString()}
            />
            <Legend />
            {allTypes.map((t) => (
              <Line
                key={t}
                yAxisId={t}
                type="monotone"
                dataKey={t.toLowerCase()}
                name={`${t} (${unitByType[t]})`}
                stroke={colorType[t]}
                strokeWidth={2}
                dot={false}
                isAnimationActive={false}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  }

  const display = capitalize(type);
  return (
    <div>
      <h2>
        {display} {unitByType[display]}
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="timeStamp" tickFormatter={timeFormat} />
          <YAxis unit={unitByType[display]} />
          <Tooltip
            labelFormatter={(time) => new Date(time).toLocaleString()}
            formatter={(value) => [`${value} ${unitByType[display]}`, display]}
          />
          <Line
            type="monotone"
            dataKey={type}
            stroke={colorType[display]}
            strokeWidth={2}
            dot={false}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default MeasurementChart;
