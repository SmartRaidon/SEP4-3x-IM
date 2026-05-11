import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import MeasurementContainer from "../components/MeasurementContainer";
import { measurementsApi } from "../services/measurementsApi";
import { LineChart } from "recharts";

const measurementsType = ["temperature", "humidity", "light"];
const unitByType = {"temperature": "°C", "humidity": "%", "light": "lx", }
function ViewDataPage() {
  const [measurements, setMeasurements] = useState(null);
  const [activeType, setActiveType] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { roomId: roomIdParam } = useParams();
  const roomId = Number(roomIdParam);

  //render measures data
  useEffect(() => {
    const fetchMeasurements = async () => {
      try {
        const data = await measurementsApi.getMeasurements(roomId);
        setMeasurements(data);
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
  if (!measurements) return <p>No measurements available</p>;

  //pick which measurements to display, all three or just the selected one
  const typesToShow =
  activeType === "All" ? measurementsType : [activeType];

  return (
    <div>
      <h1>ViewData</h1>
      
     {/*render btn for each msr type, plus an "All" btn to show every measurement*/}
      <div>
        <button onClick={() => setActiveType("All")}>All</button>
        {Object.keys(measurements).filter((type) => measurementsType.includes(type)).map((type) => (
        <button key={type} className="msr-btn" onClick={() => setActiveType(type)}>
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
      
      <Link to="/">
        <button className="nav-btn">Home</button>
      </Link>
    </div>
  );
}

export default ViewDataPage;
