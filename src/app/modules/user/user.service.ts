import { TUser } from './user.interface';
import { User } from './user.model';

// create user
const createUserIntoDB = async (user: TUser) => {
  const result = await User.create(user);
  return result;
};

// get all users
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

// get single user
const getSingleUserFromDB = async (userId: number) => {
  const result = await User.findOne({ userId });

  if ((await User.isUserExist(userId)) === null) {
    throw new Error('userNotFound');
  }
  return result;
};

export const userServices = {
  createUserIntoDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
};
