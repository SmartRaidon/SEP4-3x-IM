import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Scenario from "../components/Scenario";
import { scenarioService } from "../services/scenarioApi";

function ComfortZonePage() {
  const [scenario, setScenario] = useState(null);
  const [loading, setLoading] = useState(true);
  const [feedbackLoading, setFeedbackLoading] = useState(false);
  const [error, setError] = useState(null);
  const [feedbackSent, setFeedbackSent] = useState(false);
  
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
  const handleFeedback = async (type) => {
    if (feedbackSent) return;

    try {
      setFeedbackLoading(true);

      await scenarioService.sendFeedback({
        scenarioId: scenario.id,
        feedback: type
      });

      setFeedbackSent(true);
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
        onLiked={() => handleFeedback(1)}
        onDisliked={() => handleFeedback(0)}
        disabled={feedbackSent || feedbackLoading}
      />

      <Link to="/">
        <button className="nav-btn">Home</button>
      </Link>
    </div>
  );
}

export default ComfortZonePage;