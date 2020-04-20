import React, {useReducer, memo} from 'react';
import MainContext from "./MainContext";

const MainProvider = ({children}) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case 'menu':
        return {...state, menu: action.value};
      default:
        return state;
    }
  }, {
    menu: '',
  });

  return (
    <>
      <MainContext.Provider
        value={{
          menu: state.menu,
          mainDispatch: dispatch,
        }}
      >
        {children}
      </MainContext.Provider>
    </>
  );
};

export default memo(MainProvider);
