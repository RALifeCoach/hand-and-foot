import React, {useState} from "react";
import {Button, Typography} from "@material-ui/core";
import EditUser from "./EditUser";

interface IProps {
  refreshUsers: () => void;
}

const UsersHeaderButtons = ({refreshUsers}: IProps) => {
  const [newOpen, setNewOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setNewOpen(true)}
        variant="outlined"
      >
        <Typography variant="subtitle1">New User</Typography>
      </Button>
      {newOpen && (
        <EditUser
          user={{token: '', userId: 0, userEmail: '', userName: '', role: ''}}
          open={newOpen}
          onClose={() => setNewOpen(false)}
          refreshUsers={refreshUsers}
        />
      )}
    </>
  );
};

export default UsersHeaderButtons;
