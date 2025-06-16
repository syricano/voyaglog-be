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
  res.status(200).json({ message: 'Welcome to the API' });
});
app.use('/api/users', userRouter);
app.use('/api/posts', postRouter);
app.use(errorHandler);



app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});