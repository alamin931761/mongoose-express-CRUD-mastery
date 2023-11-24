import express from 'express';
import { UserControllers } from './user.controller';
const router = express.Router();
// create user
router.post('/', UserControllers.createUser);

// get all users
router.get('/', UserControllers.getAllUsers);

export const UserRoutes = router;
