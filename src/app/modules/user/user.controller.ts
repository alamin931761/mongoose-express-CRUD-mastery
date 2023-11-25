import { Request, Response } from 'express';
import userValidationSchema from './user.validation';
import { userServices } from './user.service';

// create user
const createUser = async (req: Request, res: Response) => {
  try {
    const { user } = req.body;

    // data validation using zod
    const zodParserData = await userValidationSchema.parse(user);

    const result = await userServices.createUserIntoDB(zodParserData);

    res.status(200).json({
      success: true,
      message: 'User created successfully',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'something went wrong',
      error,
    });
  }
};

// get all users
const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await userServices.getAllUsersFromDB();
    res.status(200).json({
      success: true,
      message: 'Users data retrieved successfully',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'something went wrong',
      error,
    });
  }
};

// get single user
const getSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await userServices.getSingleUserFromDB(parseInt(userId));

    res.status(200).json({
      success: true,
      message: 'user is retrieved successfully',
      data: result,
    });
  } catch (error: any) {
    if (error.message === 'userNotFound') {
      res.status(500).json({
        success: false,
        message: {
          success: false,
          message: 'User not found',
          error: {
            code: 404,
            description: 'User not found!',
          },
        },
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'something went wrong',
        error,
      });
    }
  }
};

// delete a user
const deleteUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await userServices.deleteUserFromDB(parseInt(userId));

    res.status(200).json({
      success: true,
      message: 'User deleted successfully',
      data: result,
    });
  } catch (error: any) {
    if (error.message === 'userNotFound') {
      res.status(500).json({
        success: false,
        message: {
          success: false,
          message: 'User not found',
          error: {
            code: 404,
            description: 'User not found!',
          },
        },
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'something went wrong',
        error,
      });
    }
  }
};

export const UserControllers = {
  createUser,
  getAllUsers,
  getSingleUser,
  deleteUser,
};
