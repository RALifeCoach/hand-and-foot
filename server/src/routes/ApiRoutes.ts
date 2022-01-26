import * as express from "express";
import UserRoutes from "./user/UserRoutes";
import canUpdateUsers from "../user/canUpdateUsers";
import AuthenticationRoutes from './authentication/AuthenticationRoutes'

const ApiRoutes = () => {
  const router = express.Router();
  router.use(function (req, res, next) {
    next()
  })

  router.use("/users", canUpdateUsers, UserRoutes());
  router.use("/login", AuthenticationRoutes());
  return router;
};

export default ApiRoutes;
