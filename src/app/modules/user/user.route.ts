import express from 'express';
import { UserControllers } from './user.controller';
const router = express.Router();
// create user
router.post('/', UserControllers.createUser);

// get all users
router.get('/', UserControllers.getAllUsers);

// get single user
router.get('/:userId', UserControllers.getSingleUser);

// delete a user
router.delete('/:userId', UserControllers.deleteUser);

router.patch('/:userId', UserControllers.updateUserInformation);

export const UserRoutes = router;
