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

// update user information
router.put('/:userId', UserControllers.updateUserInformation);

// add New Product in Order
router.put('/:userId/orders', UserControllers.addNewProduct);

// Retrieve all orders for a specific user
router.get('/:userId/orders', UserControllers.allOrderForASpecificUser);

// Calculate Total Price of Orders for a Specific User
router.get('/:userId/orders/total-price', UserControllers.calculateTotalPrice);

export const UserRoutes = router;
