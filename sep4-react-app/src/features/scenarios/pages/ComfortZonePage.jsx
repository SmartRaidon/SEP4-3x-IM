import { useParams } from "react-router-dom";
import Scenario from "../components/Scenario";
import ComfortZoneChart from "../components/ComfortZoneChart";
import { useScenario } from "../hooks/useScenario";
import { rooms } from "../../layout/mocks/rooms.mock";

function ComfortZonePage() {
  const { roomId: roomIdParam } = useParams();
  const roomId = Number(roomIdParam);
  const roomName = rooms.find((r) => r.id === roomId)?.name ?? `Room ${roomId}`;

  const {
    scenario,
    loading,
    error,
    sendFeedback,
    feedbackLoadingFor,
    feedbackSentFor,
  } = useScenario(roomId);

  return (
    <div className="page comfort-zone-page">
      <header className="page-header">
        <h1 className="page-title">Comfort Zone</h1>
        <p className="page-subtitle">{roomName}</p>
      </header>

      {loading && <p>Loading scenario...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && !error && !scenario && <p>No scenario available</p>}

      {!loading && !error && scenario && (
        <>
          <Scenario
            scenario={scenario}
            onLiked={(valueType) => sendFeedback(valueType, 1)}
            onDisliked={(valueType) => sendFeedback(valueType, 0)}
            feedbackLoadingFor={feedbackLoadingFor}
            feedbackSentFor={feedbackSentFor}
          />
          <ComfortZoneChart scenario={scenario} />
        </>
      )}
    </div>
  );
}

export default ComfortZonePage;
