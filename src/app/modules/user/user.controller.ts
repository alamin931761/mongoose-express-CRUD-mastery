import { Request, Response } from 'express';
import userValidationSchema from './user.validation';
import { userServices } from './user.service';

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

export const UserControllers = {
  createUser,
};
