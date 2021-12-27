import { useCallback, useReducer } from "react";
import { IAction } from "General";
import {useRecoilValue} from 'recoil'
import {configAtom, userAtom} from '../atoms/main'

interface ISaveState {
  response: any;
  status: string;
  exception: Error | null;
}

const useFetchSave = () => {
  const user = useRecoilValue(userAtom)
  const config = useRecoilValue(configAtom)

  const [state, dispatch] = useReducer(
    (state: ISaveState, action: IAction) => {
      switch (action.type) {
        case "in progress":
          return { ...state, status: action.type };
        case "success":
          return { ...state, status: action.type, response: action.value };
        case "resetStatus":
          return { ...state, status: "" };
        case "waitStatus":
          return { ...state, status: "waiting" };
        case "error":
          return { ...state, status: "error", response: action.value };
        default:
          return { ...state, status: "failure", exception: action.value };
      }
    },
    {
      response: null,
      status: "",
      exception: null,
    }
  );

  return [
    state as any,
    useCallback(
      (body: object, url: string, type: string = "POST") => {
        try {
          dispatch({ type: "in progress", value: null });
          const fullUrl = `${config.API_URL}/${url}`;
          fetch(fullUrl, {
            method: type,
            headers: new Headers({
              Authorization: user?.token || "",
              "Content-Type": "application/json;charset=UTF-8",
              Accept: "application/json",
            }),
            body: JSON.stringify(body),
          })
            .then((response) => {
              if (!response.ok) {
                if (!response.statusText) {
                  return response.json();
                }
                dispatch({
                  type: "failure",
                  value: new Error(response.statusText),
                });
                return;
              }
              return response.json();
            })
            .then((response) => {
              if (!response) {
                dispatch({
                  type: "failure",
                  value: new Error("unknown error"),
                });
                return;
              }
              if (response.status && response.status === "Failure") {
                dispatch({ type: "failure", value: new Error(response.error) });
                return;
              }
              dispatch({ type: "success", value: response });
            })
            .catch((ex) => {
              dispatch({ type: "failure", value: ex });
            });
        } catch (ex) {
          dispatch({ type: "failure", value: ex });
        }
      },
      [config.API_URL, user]
    ) as any,
    dispatch as any,
  ];
};

export default useFetchSave;
