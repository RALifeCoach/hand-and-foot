import * as express from "express";
import UserRoutes from "./user/UserRoutes";
import GameRoutes from "./game/GameRoutes";
import canUpdateUsers from "../user/canUpdateUsers";

const ApiRoutes = () => {
  const router = express.Router();
  router.use("/users", canUpdateUsers, UserRoutes());
  router.use("/game", GameRoutes());
  return router;
};

export default ApiRoutes;
