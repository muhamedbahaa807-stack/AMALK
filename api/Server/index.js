import express from 'express';
import mongoose from 'mongoose';
import User from '../models/User.js';
import { hashing } from './helpers/hashPass.js';
import session from 'express-session';
import mainRouter from './routes/mainRoutes.js';
import passport from 'passport';

const app = express();
const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log('connected'))
  .catch((err) => console.log(`Error ${err}`));

app.use(express.json());

app.use(
  session({
    secret: 'Muhamed',
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 60000 * 60 * 24,
    },
  }),
);
app.use(passport.initialize());
app.use(passport.session());
app.use(mainRouter);
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
