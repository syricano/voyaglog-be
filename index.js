import express from 'express';
import cors from 'cors';
import {errorHandler} from './middlewares/errorHandler.js';
import postRouter from './routes/postRouter.js';
import asyncHandler from './utils/asyncHandler.js';
import userRouter from './routes/userRouter.js';




const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.use(express.json());
app.use(errorHandler);

app.use('/api/users', userRouter);
app.use('/api/posts', postRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || "Server Error",
  });
});
app.get('/', (req, res) => {
  res.send('Hello, from the backend!');
});





app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});