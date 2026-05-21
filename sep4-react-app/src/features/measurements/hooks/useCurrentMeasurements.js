import { useEffect, useState } from "react";
import { measurementsApi } from "../api/measurementsApi";

export function useCurrentMeasurements(roomId) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!roomId) return;

    let cancel = false;

    const fetchData = async () => {
        setIsLoading(true);
        setError(null);

        try {
        const result = await measurementsApi.getMeasurements(roomId);

        if (cancel) return;
        setData(result);
        } catch (err) {
        if (cancel) return;
        setError(err);
        setData(null);
        } finally {
        if (!cancel) {
            setIsLoading(false);
        }
        }
    };

    fetchData();
    return () => { cancel = true; };
    }, [roomId]);

  // derived effect logic
  const safeData = roomId ? data : null;
  const safeError = roomId ? error : null;
  const safeLoading = roomId ? isLoading : false;

  return {
    data: safeData,
    isLoading: safeLoading,
    error: safeError,
  };
}