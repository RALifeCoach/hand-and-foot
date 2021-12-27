import React, { useCallback, useEffect, useState } from "react";
import {
  IconButton,
  TableCell, Tooltip,
} from "@mui/material";
import { Delete, Edit } from '@mui/icons-material';
import Spacer from "../shared/Spacer";
import { IGameRow } from "Game";
import FlexRow from "../shared/flex-grid/FlexRow";
import WarningDialog from "../shared/WarningDialog";
import useFetchSave from "../hooks/useFetchSave";
import UpdateHandling from "../shared/UpdateHandling";
import EditGame from "./EditGame";
import SitButtons from "./SitButtons";

interface IProps {
  game: IGameRow;
  refreshGames: () => void;
}

const GamesRowButtons = ({ game, refreshGames }: IProps) => {
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const [deleteStatus, performDelete] = useFetchSave();
  const handleDelete = useCallback(() => {
    const body = { gameId: game.gameId };
    performDelete(body, 'api/game/delete');
  }, [game, performDelete]);

  useEffect(() => {
    if (deleteStatus.status === 'success') {
      refreshGames();
      setOpenDelete(false);
    }
  }, [deleteStatus, refreshGames]);

  return (
    <>
      <TableCell>
        <FlexRow>
          <IconButton
            onClick={() => setOpenEdit(true)}
          >
            <Tooltip
              title="Edit"
              placement="top"
              arrow
            >
              <Edit
                style={{ width: 30, height: 30 }}
              />
            </Tooltip>
          </IconButton>
          <Spacer />
          <IconButton
            onClick={() => setOpenDelete(true)}
          >
            <Tooltip
              placement="top"
              title="Delete"
              arrow
            >
              <Delete
                style={{ width: 30, height: 30 }}
              />
            </Tooltip>
          </IconButton>
          <Spacer />
          <SitButtons
            game={game}
          />
        </FlexRow>
      </TableCell>
      <WarningDialog
        open={openDelete}
        topText="Warning: Delete Game"
        middleText={`Are you sure you want to delete this game?`}
        proceedText="Delete"
        cancelText="Return"
        onClose={() => setOpenDelete(false)}
        onProceed={handleDelete}
        height={250}
      />
      {openEdit && (
        <EditGame
          game={game}
          open={openEdit}
          onClose={() => setOpenEdit(false)}
          refreshGames={refreshGames}
        />
      )}
      <UpdateHandling status={deleteStatus} title="Deleting game" />
    </>
  );
};

export default GamesRowButtons;
