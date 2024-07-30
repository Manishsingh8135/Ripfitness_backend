// src/services/userService.ts

import { User, IUser } from '../models/User';
import bcrypt from 'bcryptjs';

export class UserService {
  async createUser(userData: Partial<IUser>): Promise<Omit<IUser, 'password'>> {
    // Check if user already exists
    const existingUser = await User.findOne({ email: userData.email });
    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    // If password is provided, hash it
    if (userData.password) {
      const salt = await bcrypt.genSalt(10);
      userData.password = await bcrypt.hash(userData.password, salt);
    }

    // Create new user
    const user = new User(userData);
    await user.save();

    // Return user without password
    const userWithoutPassword = await User.findById(user._id).select('-password');
    if (!userWithoutPassword) {
      throw new Error('Failed to retrieve created user');
    }

    return userWithoutPassword.toObject();
  }

  // ... rest of the UserService methods
}

export const userService = new UserService();