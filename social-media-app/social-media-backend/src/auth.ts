import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

// Utility function to generate JWT
export const generateToken = (userId: string) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET || 'your_jwt_secret', {
    expiresIn: '1h', // Token expires in 1 hour
  });
};

// Utility function to hash a password
export const hashPassword = async (password: string) => {
  return bcrypt.hash(password, 10); // salt rounds = 10
};

// Utility function to compare a password with a hash
export const comparePassword = async (password: string, hash: string) => {
  return bcrypt.compare(password, hash);
};