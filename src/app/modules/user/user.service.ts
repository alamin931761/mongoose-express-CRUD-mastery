import { User } from './user.interface';
import { UserModel } from './user.model';

// create user
const createUserIntoDB = async (user: User) => {
  const result = await UserModel.create(user);
  return result;
};

// get all users
const getAllUsersFromDB = async () => {
  const result = await UserModel.find().select({
    username: 1,
    fullName: 1,
    age: 1,
    email: 1,
    address: 1,
    _id: 0,
  });
  return result;
};

// username: 0,
//     fullName: 0,
//     age: 0,
//     email: 0,
//     address: 0,

export const userServices = {
  createUserIntoDB,
  getAllUsersFromDB,
};
