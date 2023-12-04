import { TOrder, TUser } from './user.interface';
import { User } from './user.model';

// Create a new user
const createUserIntoDB = async (user: TUser) => {
  const result = await User.create(user);
  return result;
};

// Retrieve a list of all users
const getAllUsersFromDB = async () => {
  const result = await User.find().select({
    _id: 0,
    username: 1,
    fullName: 1,
    age: 1,
    email: 1,
    address: 1,
  });
  return result;
};

// Retrieve a specific user by ID
const getSingleUserFromDB = async (userId: number) => {
  const result = await User.findOne({ userId }).select({
    password: 0,
    _id: 0,
    orders: 0,
  });

  if ((await User.isUserExist(userId)) === null) {
    throw new Error('userNotFound');
  }
  return result;
};

// Update user information
const updateUserInformationFromDB = async (
  user: Partial<TUser>,
  userId: number,
) => {
  if ((await User.isUserExist(userId)) === null) {
    throw new Error('userNotFound');
  }
  const result = await User.updateOne({ userId }, user);
  return result;
};

// delete a user
const deleteUserFromDB = async (userId: number) => {
  if ((await User.isUserExist(userId)) === null) {
    throw new Error('userNotFound');
  }
  const result = await User.deleteOne({ userId });
  return result;
};

// Add New Product in Order
const addNewProductInOrder = async (order: TOrder, userId: number) => {
  if ((await User.isUserExist(userId)) === null) {
    throw new Error('userNotFound');
  }

  const result = await User.updateOne(
    { userId },
    { $addToSet: { orders: order } },
  );
  return result;
};

// Retrieve all orders for a specific user
const getAllOrdersForASpecificUserFromDB = async (userId: number) => {
  if ((await User.isUserExist(userId)) === null) {
    throw new Error('userNotFound');
  }

  const result = await User.findOne({ userId }).select({ orders: 1, _id: 0 });
  return result;
};

// Calculate Total Price of Orders for a Specific User
const calculateTotalPriceFromDB = async (userId: number) => {
  if ((await User.isUserExist(userId)) === null) {
    throw new Error('userNotFound');
  }

  const result = await User.aggregate([
    // stage-1
    { $match: { userId } },

    // stage-2
    { $unwind: '$orders' },

    // stage-3
    {
      $group: {
        _id: null,
        totalPrice: {
          $sum: { $multiply: ['$orders.price', '$orders.quantity'] },
        },
      },
    },

    // stage-4
    {
      $project: {
        _id: 0,
        totalPrice: { $round: ['$totalPrice', 2] },
      },
    },
  ]);
  return result[0];
};

export const userServices = {
  createUserIntoDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
  deleteUserFromDB,
  updateUserInformationFromDB,
  addNewProductInOrder,
  getAllOrdersForASpecificUserFromDB,
  calculateTotalPriceFromDB,
};
