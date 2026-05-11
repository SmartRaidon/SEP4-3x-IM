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
const unitByType = { temperature: "°C", humidity: "%", light: "lx" };
const colorType = {
    temperature: "#e63946",
    humidity: "#1d4ed8",
    light: "#608b1b",
}
function timeFormat(time){
    const t = new Date(time);
    return `${t.getHours()}:${String(t.getMinutes()).padStart(2,"0")}`;
}
function MeasurementChart({type, data}){
return(
    <div>
        <h2>
            {type} {unitByType[type]}
        </h2>
        <ResponsiveContainer width="100%" height = {300}>
        <LineChart data={data}  >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="timeStamp" tickFormatter = {timeFormat} />
        <YAxis unit = {unitByType[type]} />
        <Tooltip
        labelFormatter = {(time) => new Date(time).toLocaleString()}
        formatter = {(value) => [`${value} ${unitByType[type]}`, type]}
        ></Tooltip>
        <Line
            type="monotone"
            dataKey={type}
            stroke={colorType[type]}
            strokeWidth={2}
            dot={false}
            isAnimationActive={false}
          />
        </LineChart>
        </ResponsiveContainer>
    </div>
);
} export default MeasurementChart;