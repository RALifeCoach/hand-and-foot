import React from "react";
import {
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import { User } from "User";
import UsersRowButtons from "./UsersRowButtons";

interface IProps {
  user: User;
  refreshUsers: () => void;
}

const UsersRow = ({ user, refreshUsers }: IProps) => {
  return (
    <>
      <TableRow>
        <TableCell><Typography variant="body1">{user.id}</Typography></TableCell>
        <TableCell><Typography variant="body1">{user.userEmail}</Typography></TableCell>
        <TableCell><Typography variant="body1">{user.userName}</Typography></TableCell>
        <TableCell><Typography variant="body1">{user.role}</Typography></TableCell>
        <UsersRowButtons user={user} refreshUsers={refreshUsers} />
      </TableRow>
    </>
  );
};

export default UsersRow;
