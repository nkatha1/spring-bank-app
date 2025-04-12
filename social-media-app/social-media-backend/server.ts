const express = require('express');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

// Example route to create a user
app.post('/users', async (req, res) => {
  const { email, name } = req.body;

  const user = await prisma.user.create({
    data: { email, name },
  });

  res.json(user);
});

// Example route to get all users
app.get('/users', async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});