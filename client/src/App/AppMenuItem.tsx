import React from 'react';
import {Tab, Typography} from "@material-ui/core";
import MainContext from "./MainContext";

interface IProps {
  title: string;
  value: string;
}

const AppMenuItem = ({title, value}: IProps) => {
  const {mainDispatch} = React.useContext(MainContext);

  return (
    <Tab
      label={(<Typography>{title}</Typography>)}
      value={value}
      onClick={() => {
        mainDispatch({type: 'menu', value: value});
      }}
    />
  );
};

export default AppMenuItem;
