import express from 'express';

// NOTE: Because we are using custom PrismaClient, we need to import it from the custom path
// instead of '@prisma/client'
import { PrismaClient } from './prisma/client';

const prisma = new PrismaClient();
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: 'Hello World 🌍🚀',
  });
});

app.get('/users', async (req, res) => {
  const users = await prisma.user.findMany();
  res.json({
    message: 'List of all users',
    data: users,
  });
});

app.post('/users', async (req, res) => {
  const { name, email } = req.body;
  const user = await prisma.user.create({
    data: {
      name,
      email,
    },
  });
  res.json({
    message: 'User created successfully',
    data: user,
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on <http://localhost:${PORT}> 🚀`);
});
