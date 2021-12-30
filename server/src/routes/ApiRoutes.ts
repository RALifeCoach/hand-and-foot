import * as express from "express";
import UserRoutes from "./user/UserRoutes";
import canUpdateUsers from "../user/canUpdateUsers";

const ApiRoutes = () => {
  const router = express.Router();
  router.use("/users", canUpdateUsers, UserRoutes());
  return router;
};

export default ApiRoutes;
