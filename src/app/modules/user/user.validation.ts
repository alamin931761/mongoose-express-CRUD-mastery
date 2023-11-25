import { z } from 'zod';

const fullNameValidationSchema = z.object({
  firstName: z.string().trim().min(2).max(15),
  lastName: z.string().min(2).max(15).trim(),
});

const addressValidationSchema = z.object({
  street: z.string().trim().trim().min(2),
  city: z.string().trim().min(2),
  country: z.string().trim().min(2),
});

const orderValidationSchema = z.object({
  productName: z.string().trim().min(1),
  price: z.number().positive(),
  quantity: z.number().positive(),
});

const userValidationSchema = z.object({
  userId: z.number(),
  username: z.string().max(20),
  password: z.string().min(8).max(30),
  fullName: fullNameValidationSchema.required(),
  age: z.number(),
  email: z.string().email(),
  isActive: z.boolean().default(true),
  hobbies: z.array(z.string()).min(2),
  address: addressValidationSchema.required(),
  orders: z.array(orderValidationSchema).optional(),
});

export default userValidationSchema;
