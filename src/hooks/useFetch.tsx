import axios from "axios";
import { useReducer, useEffect, useRef } from "react";

interface IFetchProps<T> {
  url: string;
  options: any;
}

interface State<T> {
  data?: T;
  error?: Error;
}

export const enum FetchReducerState {
  LOADING = "LOADING",
  FETCHED = "FETCHED",
  ERROR = "ERROR",
}

type Action<T> =
  | { type: FetchReducerState.LOADING }
  | { type: FetchReducerState.FETCHED; payload: T }
  | { type: FetchReducerState.ERROR; payload: Error };

const useFetch = <T = unknown,>({ url, options }: IFetchProps<T>): State<T> => {
  const abortRequest = useRef<boolean>(false);
  const initialState: State<T> = {
    error: undefined,
    data: undefined,
  };
  const fetchReducer = (state: State<T>, action: Action<T>): State<T> => {
    switch (action.type) {
      case FetchReducerState.LOADING:
        return { ...initialState };
      case FetchReducerState.FETCHED:
        return { ...initialState, data: action.payload };
      case FetchReducerState.ERROR:
        return { ...initialState, error: action.payload };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(fetchReducer, initialState);

  useEffect(() => {
    if (!url) return;

    abortRequest.current = false;
    const fetchData = async () => {
      dispatch({ type: FetchReducerState.LOADING });

      try {
        const response = await axios.post(url, options);
        const data = response.data;
        if (abortRequest.current) return;
        dispatch({ type: FetchReducerState.FETCHED, payload: data });
      } catch (error) {
        if (abortRequest.current) return;
        dispatch({ type: FetchReducerState.ERROR, payload: error as Error });
      }
    };
    void fetchData();
    return () => {
      abortRequest.current = true;
    };
  }, [url]);
  return state;
};

export default useFetch;
