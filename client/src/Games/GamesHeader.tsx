import React from "react";
import {
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";

const GamesHeader = () => {
  return (
    <>
      <TableHead>
        <TableRow>
          <TableCell>Id</TableCell>
          <TableCell>Name</TableCell>
          <TableCell>Number of Players</TableCell>
          <TableCell>State</TableCell>
          <TableCell />
        </TableRow>
      </TableHead>
    </>
  );
};

export default GamesHeader;
