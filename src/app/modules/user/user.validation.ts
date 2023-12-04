import { z } from 'zod';

const fullNameValidationSchema = z.object({
  firstName: z
    .string({
      required_error: 'First name is required',
      invalid_type_error: 'First name must be a string',
    })
    .trim()
    .min(2, { message: 'First name must be 2 characters or longer' })
    .max(15, { message: 'First name must be 15 characters or less' }),

  lastName: z
    .string({
      required_error: 'Last name is required',
      invalid_type_error: 'Last name must be a string',
    })
    .min(2, { message: 'Last name must be 2 characters or longer' })
    .max(15, { message: 'Last name must be 15 characters or less' })
    .trim(),
});

const addressValidationSchema = z.object({
  street: z
    .string({
      required_error: 'Street is required',
      invalid_type_error: 'Street must be a string',
    })
    .trim()
    .min(2, { message: 'Street must be 2 characters or longer' }),

  city: z
    .string({
      required_error: 'City is required',
      invalid_type_error: 'City must be a string',
    })
    .trim()
    .min(2, { message: 'City must be 2 characters or longer' }),

  country: z
    .string({
      required_error: 'Country is required',
      invalid_type_error: 'Country must be a string',
    })
    .trim()
    .min(2, { message: 'Country must be 2 characters or longer' }),
});

const orderValidationSchema = z.object({
  productName: z
    .string({
      required_error: 'Product name is required',
      invalid_type_error: 'Product name must be a string',
    })
    .trim()
    .min(2, { message: 'Product name must be 2 characters or longer' }),

  price: z
    .number({
      required_error: 'Price is required',
      invalid_type_error: 'Price must be a number',
    })
    .positive({ message: 'Price must be a positive number' }),

  quantity: z
    .number({
      required_error: 'Quantity is required',
      invalid_type_error: 'Quantity must be a number',
    })
    .positive({ message: 'Quantity must be a positive number' }),
});

const userValidationSchema = z.object({
  userId: z
    .number({
      required_error: 'User ID is required',
      invalid_type_error: 'User ID must be a number',
    })
    .positive({ message: 'User ID must be a positive number' }),

  username: z
    .string({
      required_error: 'Username is required',
      invalid_type_error: 'Username must be a string',
    })
    .max(20, { message: 'Username must be 20 characters or less' }),

  password: z
    .string({
      required_error: 'Password is required',
      invalid_type_error: 'Password must be a string',
    })
    .min(8, { message: 'Password must be 8 characters or longer' })
    .max(30, { message: 'Password must be 30 characters or less' }),

  fullName: fullNameValidationSchema.required(),

  age: z
    .number({
      required_error: 'Age is required',
      invalid_type_error: 'Age must be a number',
    })
    .positive({ message: 'Age must be a positive number' }),

  email: z
    .string({
      required_error: 'Email is required',
      invalid_type_error: 'Email must be a string',
    })
    .email(),

  isActive: z.boolean().default(true),

  hobbies: z
    .array(
      z.string({
        required_error: 'Hobbies is required',
        invalid_type_error: 'Hobbies must be string',
      }),
    )
    .min(2, { message: 'You must add at least 2 hobbies' }),

  address: addressValidationSchema.required(),
  orders: z.array(orderValidationSchema).optional(),
});

const UpdateUserInformationValidationSchema = z.object({
  userId: z
    .number({
      required_error: 'User ID is required',
      invalid_type_error: 'User ID must be a number',
    })
    .positive({ message: 'User ID must be a positive number' })
    .optional(),

  username: z
    .string({
      required_error: 'Username is required',
      invalid_type_error: 'Username must be a string',
    })
    .max(20, { message: 'Username must be 20 characters or less' })
    .optional(),

  password: z
    .string({
      required_error: 'Password is required',
      invalid_type_error: 'Password must be a string',
    })
    .min(8, { message: 'Password must be 8 characters or longer' })
    .max(30, { message: 'Password must be 30 characters or less' })
    .optional(),

  fullName: fullNameValidationSchema.optional(),

  age: z
    .number({
      required_error: 'Age is required',
      invalid_type_error: 'Age must be a number',
    })
    .positive({ message: 'Age must be a positive number' })
    .optional(),

  email: z
    .string({
      required_error: 'Email is required',
      invalid_type_error: 'Email must be a string',
    })
    .email()
    .optional(),

  isActive: z.boolean().default(true).optional(),

  hobbies: z
    .array(
      z.string({
        required_error: 'Hobbies is required',
        invalid_type_error: 'Hobbies must be string',
      }),
    )
    .min(2, { message: 'You must add at least 2 hobbies' })
    .optional(),

  address: addressValidationSchema.optional(),
  orders: z.array(orderValidationSchema).optional(),
});

// add new product schema
const addNewProductValidationSchema = z.object({
  productName: z
    .string({
      required_error: 'Product name is required',
      invalid_type_error: 'Product name must be a string',
    })
    .trim()
    .min(2, { message: 'Product name must be 2 characters or longer' }),

  price: z
    .number({
      required_error: 'Price is required',
      invalid_type_error: 'Price must be a number',
    })
    .positive({ message: 'Price must be a positive number' }),

  quantity: z
    .number({
      required_error: 'Quantity is required',
      invalid_type_error: 'Quantity must be a number',
    })
    .positive({ message: 'Quantity must be a positive number' }),
});

export const ValidationSchema = {
  userValidationSchema,
  UpdateUserInformationValidationSchema,
  addNewProductValidationSchema,
};
