import express from 'express';
import cors from 'cors';
import errorHandler from './middlewares/errorHandler.js';
import postRouter from './routes/postRouter.js';
import userRouter from './routes/userRouter.js';
import sequelize from './db/index.js';
import './db/associations.js'; 
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create an instance of express
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());

// Serve uploaded images
app.use('/uploads', express.static('uploads'));

// Root route
app.get('/', (req, res) => {
  res.status(200).json({ 
    message: "Welcome to the Travel Blog API",
    routes: {
      users: {
        list: "GET /api/users",
        getUserById: "GET /api/users/:id",
        createUser: "POST /api/users",
      },
      posts: {
        list: "GET /api/posts",
        getPostById: "GET /api/posts/:id",
        createPost: "POST /api/posts",
      },
      auth: {
        login: "POST /api/login",
        register: "POST /api/register",
      }
    }
   });
});

// Routes
app.use('/api/users', userRouter);
app.use('/api/posts', postRouter);

// Error handling middleware
app.use(errorHandler);


// DB Sync and Server Start
sequelize.sync({ alter: true })
  .then(() => {
    console.log('Database synced');
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to sync database:', err);
  });