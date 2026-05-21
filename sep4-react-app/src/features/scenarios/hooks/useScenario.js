import { useEffect, useState } from "react";
import { scenarioService } from "../api/scenarioApi";

export function useScenario(roomId) {
  const [scenario, setScenario] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [feedbackLoadingFor, setFeedbackLoadingFor] = useState([]);
  const [feedbackSentFor, setFeedbackSentFor] = useState(new Set());

  useEffect(() => {
    if (!roomId) return;

    let cancel = false;

    const fetchScenario = async () => {
      setLoading(true);
      setError(null);

      try {
        const result = await scenarioService.getScenario(roomId);

        if (!cancel) {
          setScenario(result);
        }
      } catch (err) {
        if (!cancel) {
          setError(err);
          setScenario(null);
        }
      } finally {
        if (!cancel) {
          setLoading(false);
        }
      }
    };

    fetchScenario();

    return () => {
      cancel = true;
    };
  }, [roomId]);

  const sendFeedback = async (valueType, feedback) => {
    if (!scenario) return;

    setFeedbackLoadingFor((previous) => [
      ...previous,
      valueType,
    ]);

    try {
      const result = await scenarioService.sendFeedback({
        scenarioId: scenario.id,
        valueType,
        feedback,
      });

      // like
      if (feedback === 1) {
        setFeedbackSentFor(
          (previous) => new Set(previous).add(valueType)
        );
      }

      // dislike
      if (
        feedback === 0 &&
        result.newPredictedValue !== undefined
      ) {
        setScenario((previousScenario) => ({
          ...previousScenario,

          values: previousScenario.values.map((value) =>
            value.type === valueType
              ? {
                  ...value,
                  predictedValue:
                    result.newPredictedValue,
                }
              : value
          ),
        }));
      }
    } catch (err) {
      console.error(err);
      setError(err);
    } finally {
      setFeedbackLoadingFor((previous) =>
        previous.filter(
          (type) => type !== valueType
        )
      );
    }
  };

  // derived safe state
  const safeScenario = roomId ? scenario : null;
  const safeError = roomId ? error : null;
  const safeLoading = roomId ? loading : false;

  return {
    scenario: safeScenario,
    loading: safeLoading,
    error: safeError,
    sendFeedback,
    feedbackLoadingFor,
    feedbackSentFor,
  };
}