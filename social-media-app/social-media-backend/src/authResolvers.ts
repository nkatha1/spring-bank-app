// src/authResolvers.ts
import { PrismaClient } from '@prisma/client';
import { hashPassword, comparePassword, generateToken } from '../utils/auth';

const prisma = new PrismaClient();

export const authResolvers = {
  Mutation: {
    register: async (_: any, args: any) => {
      const { name, email, password } = args.input;
      const existingUser = await prisma.user.findUnique({ where: { email } });
      if (existingUser) {
        throw new Error('User already exists');
      }
      const hashedPassword = await hashPassword(password);
      const user = await prisma.user.create({
        data: { name, email, password: hashedPassword },
      });
      const token = generateToken(user.id);
      return { token, user };
    },
    login: async (_: any, args: any) => {
      const { email, password } = args.input;
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) {
        throw new Error('Invalid credentials');
      }
      const isValid = await comparePassword(password, user.password);
      if (!isValid) {
        throw new Error('Invalid credentials');
      }
      const token = generateToken(user.id);
      return { token, user };
    },
  },
};
