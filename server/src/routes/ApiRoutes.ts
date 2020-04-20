import * as express from 'express';
import UserRoutes from './user/UserRoutes';
// import GameRoutes from './game/GameRoutes';
// import canUpdateTrips from './Trips/canUpdateTrips';
import canUpdateUsers from '../Users/canUpdateUsers';

const ApiRoutes = () => {
  const router = express.Router();
  router.use('/users', canUpdateUsers, UserRoutes());
  // router.use('/trips', canUpdateTrips, TripRoutes);
  return router;
}

export default ApiRoutes;
