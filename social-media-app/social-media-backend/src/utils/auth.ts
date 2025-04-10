import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret';

export const createToken = (user: { id: string; email: string }) => {
  return jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, {
    expiresIn: '7d',
  });
};

export const getUserFromToken = (token: string) => {
  try {
    if (token.startsWith('Bearer ')) token = token.slice(7);
    return jwt.verify(token, JWT_SECRET) as { userId: string };
  } catch (e) {
    return null;
  }
};