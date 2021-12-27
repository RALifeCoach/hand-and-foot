import React from 'react';
import {Tab, Typography} from "@mui/material";
import {useSetRecoilState} from 'recoil'
import {menuAtom} from '../atoms/main'

interface IProps {
  title: string;
  value: string;
}

const AppMenuItem = ({title, value}: IProps) => {
  const setMenu = useSetRecoilState(menuAtom)

  return (
    <Tab
      label={(<Typography>{title}</Typography>)}
      value={value}
      onClick={() => {
        setMenu(value)
      }}
    />
  );
};

export default AppMenuItem;
