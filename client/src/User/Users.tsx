import React, { useCallback, useEffect } from "react";
import useFetchGet from "../hooks/useFetchGet";
import { User } from "User";
import { Paper, Table, TableBody, Typography } from "@mui/material";
import FlexRow from "../shared/flex-grid/FlexRow";
import Spacer from "../shared/Spacer";
import UsersHeader from "./UsersHeader";
import UsersRow from "./UsersRow";
import UsersHeaderButtons from "./UsersHeaderButtons";
import ApplicationBar from "../App/ApplicationBar";

const Users = () => {
  const [users, fetchUsers] = useFetchGet();
  useEffect(() => {
    fetchUsers('api/users/query');
  }, [fetchUsers]);

  const refreshUsers = useCallback(() => {
    fetchUsers('api/users/query');
  }, [fetchUsers]);

  return (
    <>
      <ApplicationBar
        notifications={false}
      />
      <Paper elevation={1} style={{ padding: 16, margin: '96px 16px 16px 16px' }}>
        <FlexRow justify="space-between">
          <Typography variant="h2">Users</Typography>
          <UsersHeaderButtons
            refreshUsers={refreshUsers}
          />
        </FlexRow>
        <Spacer height={16} />
        <Table size="small">
          <UsersHeader />
          <TableBody>
            {(users?.data || []).map((user: User) => (
              <UsersRow
                refreshUsers={refreshUsers}
                user={user}
                key={user.id}
              />
            ))}
          </TableBody>
        </Table>
      </Paper>
    </>
  );
};

export default Users;
