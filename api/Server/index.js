import express from 'express';
import mongoose from 'mongoose';
import User from '../models/User.js';
import { hashing } from './helpers/hashPass.js';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import mainRouter from './routes/mainRoutes.js';
import passport from 'passport';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();
const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log('connected'))
  .catch((err) => console.log(`Error ${err}`));

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  }),
);

app.use(mainRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
