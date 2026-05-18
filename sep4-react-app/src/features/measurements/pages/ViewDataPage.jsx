import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import MeasurementContainer from "../components/MeasurementContainer";
import { measurementsApi } from "../api/measurementsApi";
import MeasurementChart from "../components/MeasurementChart";
import DailySummary from "../components/DailySummary";

const measurementsType = ["temperature", "humidity", "light"];
const unitByType = { temperature: "°C", humidity: "%", light: "lx" };
function ViewDataPage() {
  const [measurements, setMeasurements] = useState(null);
  const [historyMeasurements, setHistoryMeasurements] = useState([]);
  const [activeType, setActiveType] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { roomId: roomIdParam } = useParams();
  const roomId = Number(roomIdParam);

  //render measures data
  useEffect(() => {
    const fetchMeasurements = async () => {
      try {
        const [current, historyData] = await Promise.all([
          measurementsApi.getMeasurements(roomId),
          measurementsApi.getMeasurementsHistory(roomId),
        ]);
        setMeasurements(current);
        setHistoryMeasurements(historyData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMeasurements();
  }, [roomId]);

  if (loading) return <p>Loading measurements...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!measurements || historyMeasurements.length == 0)
    return <p>No measurements available</p>;

  //pick which measurements to display, all three or just the selected one
  const typesToShow = activeType === "All" ? measurementsType : [activeType];

  return (
    <div>
      <h1>ViewData</h1>

      <div className="view-data-layout">
      <div className="view-data-main">
        {/*render btn for each msr type, plus an "All" btn to show every measurement*/}
        <div className="chart-filter">
          <button onClick={() => setActiveType("All")}>All</button>
          {measurementsType.map((type) => (
            <button key={type} onClick={() => setActiveType(type)}>
              {type}
            </button>
          ))}
        </div>

        {typesToShow.map((type) => (
          <MeasurementContainer
            key={type}
            type={type}
            value={measurements[type].value}
            timeStamp={measurements[type].timeStamp}
          />
        ))}

        {typesToShow.map((type) => (
          <MeasurementChart
            key={type}
            type={type}
            data={historyMeasurements}
          />
        ))}

        <Link to="/main">
          <button className="nav-btn">Home</button>
        </Link>
      
      </div>
        <DailySummary history={historyMeasurements} types={typesToShow} />
      </div>
    </div>
);

}

export default ViewDataPage;
