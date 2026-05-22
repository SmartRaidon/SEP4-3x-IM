import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MeasurementContainer from "../components/MeasurementContainer";
import { measurementsApi } from "../api/measurementsApi";
import MeasurementChart from "../components/MeasurementChart";
import DailySummary from "../components/DailySummary";
import { rooms } from "../../layout/mocks/rooms.mock";

const measurementsType = ["temperature", "humidity", "light"];
function ViewDataPage() {
  const [measurements, setMeasurements] = useState(null);
  const [historyMeasurements, setHistoryMeasurements] = useState([]);
  const [activeType, setActiveType] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { roomId: roomIdParam } = useParams();
  const roomId = Number(roomIdParam);
  const roomName = rooms.find((r) => r.id === roomId)?.name ?? `Room ${roomId}`;

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
  if (historyMeasurements.length === 0)
    return <p>No measurements available</p>;

  //pick which measurements to display, all three or just the selected one
  const typesToShow = activeType === "All" ? measurementsType : [activeType];

  return (
    <div className="page view-data-page">
      <header className="page-header">
        <h1 className="page-title">View Data</h1>
        <p className="page-subtitle">{roomName}</p>
      </header>

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

          <MeasurementChart type={activeType} data={historyMeasurements} />
        </div>
        <DailySummary history={historyMeasurements} types={typesToShow} />
      </div>
    </div>
  );
}

export default ViewDataPage;
