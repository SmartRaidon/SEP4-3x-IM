import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Scenario from "../components/Scenario";
import ComfortZoneChart from "../components/ComfortZoneChart";
import { scenarioService } from "../api/scenarioApi";

function ComfortZonePage() {
  const [scenario, setScenario] = useState(null);
  const [loading, setLoading] = useState(true);
  const [feedbackLoading, setFeedbackLoading] = useState(false);
  const [error, setError] = useState(null);
  const [feedbackSentFor, setFeedbackSentFor] = useState([]);

  const { roomId: roomIdParam } = useParams();
  const roomId = Number(roomIdParam);

  // fetch/load scenario
  useEffect(() => {
    const fetchScenario = async () => {
      try {
        const data = await scenarioService.getScenario(roomId);
        setScenario(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchScenario();
  }, [roomId]);

  // feedback
  const handleFeedback = async (valueType, feedback) => {
    setFeedbackLoading(true);

    try {
      const result = await scenarioService.sendFeedback({
        scenarioId: scenario.id,
        valueType,
        feedback,
      });

      if (feedback === 1) {
        setFeedbackSentFor((previous) => [...previous, valueType]);
      }

      if (feedback === 0 && result.newPredictedValue !== undefined) {
        setScenario((previousScenario) => ({
          ...previousScenario,
          values: previousScenario.values.map((value) =>
            value.type === valueType
              ? { ...value, predictedValue: result.newPredictedValue }
              : value,
          ),
        }));
      }
    } catch (err) {
      console.error(err);
      alert("Failed to send feedback");
    } finally {
      setFeedbackLoading(false);
    }
  };

  // UI state
  if (loading) return <p>Loading scenario...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!scenario) return <p>No scenario available</p>;

  return (
    <div>
      <h1>Comfort Zone</h1>

      <Scenario
        scenario={scenario}
        onLiked={(valueType) => handleFeedback(valueType, 1)}
        onDisliked={(valueType) => handleFeedback(valueType, 0)}
        feedbackLoading={feedbackLoading}
        feedbackSentFor={feedbackSentFor}
      />

      <ComfortZoneChart scenario={scenario} />

      <Link to="/main">
        <button className="nav-btn">Home</button>
      </Link>
    </div>
  );
}

export default ComfortZonePage;
