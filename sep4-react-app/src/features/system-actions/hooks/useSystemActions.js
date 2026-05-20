import { useEffect, useReducer } from "react";
import { systemActionsApi } from "../api/systemActionsApi";

const initialState = { data: null, isLoading: false, error: null };

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_START":
      return { data: null, isLoading: true, error: null };
    case "FETCH_SUCCESS":
      return { data: action.payload, isLoading: false, error: null };
    case "FETCH_ERROR":
      return { data: null, isLoading: false, error: action.payload };
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

export function useSystemActions(roomId) {
  const [{ data, isLoading, error }, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (!roomId) {
      dispatch({ type: "RESET" });
      return;
    }

    let cancel = false;
    dispatch({ type: "FETCH_START" });
    systemActionsApi
      .getActions(roomId)
      .then((result) => {
        if (cancel) return;
        dispatch({ type: "FETCH_SUCCESS", payload: result });
      })
      .catch((err) => {
        if (cancel) return;
        dispatch({ type: "FETCH_ERROR", payload: err });
      });

    return () => {
      cancel = true;
    };
  }, [roomId]);

  return { data, isLoading, error };
}
