import React from "react";
import MainContext from "./MainContext";
import Users from "../User/Users";

function AppDisplayComponent() {
  const {mainState: {menu, user}} = React.useContext(MainContext);

  if (!user) {
    return null;
  }
  if (menu) {
    localStorage.setItem('main.menu', menu);
  }

  switch (menu) {
    case 'users':
      return <Users/>;
    default:
      throw new Error(`Unknown menu ${menu}`);
  }
}

export default AppDisplayComponent;
