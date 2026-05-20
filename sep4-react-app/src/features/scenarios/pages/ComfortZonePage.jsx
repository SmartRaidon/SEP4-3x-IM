import { Link, useParams } from "react-router-dom";
import Scenario from "../components/Scenario";
import ComfortZoneChart from "../components/ComfortZoneChart";
import { useScenario } from "../hooks/useScenario";

function ComfortZonePage() {
  const { roomId: roomIdParam } = useParams();
  const roomId = Number(roomIdParam);

  const {
    scenario,
    loading,
    error,
    sendFeedback,
    feedbackLoadingFor,
    feedbackSentFor,
  } = useScenario(roomId);

  // UI state
  if (loading) {
    return <p>Loading scenario...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!scenario) {
    return <p>No scenario available</p>;
  }

  return (
    <div>
      <h1>Comfort Zone</h1>
      <Scenario
        scenario={scenario}
        onLiked={(valueType) =>
          sendFeedback(valueType, 1)
        }
        onDisliked={(valueType) =>
          sendFeedback(valueType, 0)
        }
        feedbackLoadingFor={feedbackLoadingFor}
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
