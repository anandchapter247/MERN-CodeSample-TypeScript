import express from 'express';
import {
  getUsers,
  addUser,
  updateUser,
  viewUser,
  updateStatus,
  deleteUser,
} from '../controllers';
const UserRouter: express.Router = express.Router();

UserRouter.get('/get', getUsers);
UserRouter.post('/add', addUser);
UserRouter.put('/update', updateUser);
UserRouter.get('/view', viewUser);
UserRouter.put('/update-status', updateStatus);
UserRouter.delete('/delete', deleteUser);

export default UserRouter;
