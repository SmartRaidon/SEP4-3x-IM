import { useEffect, useState } from "react";
import { systemActionsApi } from "../api/systemActionsApi";

export function useSystemActions(roomId) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!roomId) {
      setIsLoading(false);
      setData(null);
      setError(null);
      return;
    }
    let cancel = false;
    setIsLoading(true);
    setError(null);
    systemActionsApi
      .getActions(roomId)
      .then((result) => {
        if (cancel) return;
        setData(result);
      })
      .catch((err) => {
        if (cancel) return;
        setError(err);
        setData(null);
      })
      .finally(() => {
        if (cancel) return;
        setIsLoading(false);
      });

    return () => {
      cancel = true;
    };
  }, [roomId]);

  return { data, isLoading, error };
}
