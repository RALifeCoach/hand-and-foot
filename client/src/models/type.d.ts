declare module 'General' {
  export type IAction = {
    type: string;
    value: any;
  }

  export type IDispatch = (action: IAction) => void

  export interface ISelect {
    value: number,
    label: any
  }

  export interface IOption {
    value: string;
    label: any;
  }

  export interface IFetchSaveState {
    response: any;
    status: string;
    exception: any;
  }
}
