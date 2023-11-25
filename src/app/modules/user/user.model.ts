import { Schema, model } from 'mongoose';
import {
  TAddress,
  TFullName,
  TOrder,
  TUser,
  UserModel,
} from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../config';

// schema
const fullNameSchema = new Schema<TFullName>({
  firstName: {
    type: String,
    required: [true, 'First name is required.'],
    trim: true,
    minLength: [2, 'First name should be at least 2 characters.'],
    maxLength: [15, 'First name should not exceed 15 characters.'],
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required.'],
    trim: true,
    minLength: [2, 'Last name should be at least 2 characters.'],
    maxLength: [15, 'Last name should not exceed 15 characters.'],
  },
});

const addressSchema = new Schema<TAddress>({
  street: {
    type: String,
    required: [true, 'Street is a required field.'],
    trim: true,
    minLength: [2, 'Street must be at least 2 characters long.'],
  },
  city: {
    type: String,
    required: [true, 'City is a required field.'],
    trim: true,
    minLength: [2, 'City must be at least 2 characters long.'],
  },
  country: {
    type: String,
    required: [true, 'Country is a required field.'],
    trim: true,
    minLength: [2, 'Country must be at least 2 characters long.'],
  },
});

const OrderSchema = new Schema<TOrder>({
  productName: {
    type: String,
    required: [true, 'Product name is required.'],
    trim: true,
  },
  price: {
    type: Number,
    required: [true, 'Price is required.'],
  },
  quantity: {
    type: Number,
    required: [true, 'Quantity is required.'],
  },
});

const userSchema = new Schema<TUser, UserModel>({
  userId: {
    type: Number,
    unique: true,
    required: [true, 'User ID is required.'],
  },
  username: {
    type: String,
    unique: true,
    required: [true, 'Username is required.'],
    maxLength: [20, 'Username must be at most 20 characters long.'],
  },
  password: {
    type: String,
    required: [true, 'Password is required.'],
    minlength: [8, 'Password must be at least 8 characters long.'],
    maxLength: [30, 'Password must be at most 30 characters long.'],
  },
  fullName: {
    type: fullNameSchema,
    required: [true, 'Full name is required.'],
  },
  age: {
    type: Number,
    required: [true, 'Age is required.'],
  },
  email: {
    type: String,
    required: [true, 'Email is required.'],
  },
  isActive: {
    type: Boolean,
    default: true,
    required: [true, 'IsActive is required.'],
  },
  hobbies: {
    type: [String],
    required: [true, 'Hobbies are required.'],
    minLength: [2, 'At least 2 hobbies are required.'],
  },
  address: {
    type: addressSchema,
    required: [true, 'Address is required.'],
  },
  orders: {
    type: [OrderSchema],
  },
});

// pre save middleware
userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

// post save middleware
userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

// custom static method
userSchema.statics.isUserExist = async function (userId: number) {
  const existingUser = await User.findOne({ userId });
  return existingUser;
};

// model
export const User = model<TUser, UserModel>('user', userSchema);
