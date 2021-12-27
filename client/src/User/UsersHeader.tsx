import React from "react";
import {
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

const UsersHeader = () => {
  return (
    <>
      <TableHead>
        <TableRow>
          <TableCell><Typography variant="subtitle1"><strong>User Id</strong></Typography></TableCell>
          <TableCell><Typography variant="subtitle1"><strong>Email</strong></Typography></TableCell>
          <TableCell><Typography variant="subtitle1"><strong>Full Name</strong></Typography></TableCell>
          <TableCell><Typography variant="subtitle1"><strong>Role</strong></Typography></TableCell>
          <TableCell />
        </TableRow>
      </TableHead>
    </>
  );
};

export default UsersHeader;
