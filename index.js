import express from 'express';
import cors from 'cors';
import errorHandler from './middlewares/errorHandler.js';
import postRouter from './routes/postRouter.js';
import asyncHandler from './utils/asyncHandler.js';
import userRouter from './routes/userRouter.js';
import './db/associations.js'; // Ensure associations are set up




const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());

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
app.use('/api/users', userRouter);
app.use('/api/posts', postRouter);
app.use(errorHandler);



app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});