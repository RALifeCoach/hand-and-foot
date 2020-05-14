import React, {useState} from "react";
import {Button} from "@material-ui/core";
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
        New User
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
