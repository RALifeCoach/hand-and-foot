import {useCallback, useReducer} from "react";
import {IAction} from 'General';

interface IFetchState {
  data: any,
  status: string;
  exception: Error|null;
}
const useFetchGet = () => {
  // @ts-ignore
  const config = window.drpacConfig;

  const [state, dispatch] = useReducer((state: IFetchState, action: IAction) => {
    switch (action.type) {
      case 'in progress':
        return {...state, status: action.type, data: action.value ? state.data : null};
      case 'success':
        return {...state, status: action.type, data: action.value};
      case 'reset':
        return {...state, status: ''};
      case 'clearData':
        return {...state, data: null, status: ''};
      default:
        return {...state, status: 'failure', exception: action.value};
    }
  }, {
    data: null,
    status: '',
    exception: null,
  } as IFetchState);


  return [
    state,
    useCallback((url: string, options:{reset?:boolean, keepWhileFetching?: boolean} = {}) => {
      if (options.reset) {
        dispatch({type: 'reset', value: null});
        return;
      }
      try {
        dispatch({type: 'in progress', value: Boolean(options && options.keepWhileFetching)});
        const fullUrl = `${config.API_URL}/${url}`;
        fetch(fullUrl, {
          headers: new Headers({
            'Content-Type': 'application/json;charset=UTF-8',
            Accept: 'application/json'
          }),
        })
          .then(response => {
            if (!response.ok) {
              if (!response.statusText) {
                return response.json();
              }
              dispatch({type: 'failure', value: new Error(response.statusText)});
              return;
            }
            return response.json();
          })
          .then(response => {
            if (!response) {
              dispatch({type: 'failure', value: new Error('unknown error')});
              return;
            }
            if (response.detail) {
              dispatch({type: 'failure', value: new Error(response.detail)});
              return;
            }
            dispatch({type: 'success', value: response});
          })
          .catch(ex => {
            dispatch({type: 'failure', value: ex});
          });
      } catch (ex) {
        dispatch({type: 'failure', value: ex});
      }
    }, [config.API_URL]),
    dispatch,
  ] as any[];
};

export default useFetchGet;
