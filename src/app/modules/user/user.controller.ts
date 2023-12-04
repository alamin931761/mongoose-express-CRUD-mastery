import { Request, Response } from 'express';
import { userServices } from './user.service';
import { TOrder } from './user.interface';
import { ValidationSchema } from './user.validation';

// create user
const createUser = async (req: Request, res: Response) => {
  try {
    // data validation using zod
    const zodParserData = await ValidationSchema.userValidationSchema.parse(
      req.body,
    );
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
      message: 'Users fetched successfully!',
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
      message: 'User fetched successfully!',
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

// Update user information
const updateUserInformation = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    // data validation using zod
    const zodParserData =
      await ValidationSchema.UpdateUserInformationValidationSchema.parse(
        req.body,
      );
    const result = await userServices.updateUserInformationFromDB(
      zodParserData,
      parseInt(userId),
    );

    res.status(200).json({
      success: true,
      message: 'User updated successfully!',
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
      data: null,
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

// Add New Product in Order
const addNewProduct = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const zodParserData =
      await ValidationSchema.addNewProductValidationSchema.parse(req.body);

    const result = await userServices.addNewProductInOrder(
      zodParserData,
      parseInt(userId),
    );

    res.status(200).json({
      success: true,
      message: 'Order created successfully!',
      data: null,
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

// Retrieve all orders for a specific user
const allOrderForASpecificUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await userServices.getAllOrdersForASpecificUserFromDB(
      parseInt(userId),
    );
    res.status(200).json({
      success: true,
      message: 'Order fetched successfully!',
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

// Calculate Total Price of Orders for a Specific User
const calculateTotalPrice = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await userServices.calculateTotalPriceFromDB(
      parseInt(userId),
    );

    res.status(200).json({
      success: true,
      message: 'Total price calculated successfully!',
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
  updateUserInformation,
  addNewProduct,
  allOrderForASpecificUser,
  calculateTotalPrice,
};
