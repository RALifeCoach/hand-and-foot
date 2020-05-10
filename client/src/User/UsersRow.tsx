import React from "react";
import {
  TableCell,
  TableRow,
  Typography,
} from "@material-ui/core";
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
        <TableCell><Typography variant="body1">{user.UserId}</Typography></TableCell>
        <TableCell><Typography variant="body1">{user.UserEmail}</Typography></TableCell>
        <TableCell><Typography variant="body1">{user.UserName}</Typography></TableCell>
        <TableCell><Typography variant="body1">{user.role}</Typography></TableCell>
        <UsersRowButtons user={user} refreshUsers={refreshUsers} />
      </TableRow>
    </>
  );
};

export default UsersRow;
