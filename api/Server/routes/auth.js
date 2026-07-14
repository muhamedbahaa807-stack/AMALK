import { Router } from 'express';
import User from '../../models/User.js';
import { hashing } from '../helpers/hashPass.js';
import { validSchema } from '../utils/validation.js';
import { validationResult, checkSchema, matchedData } from 'express-validator';
import '../strategies/local.js';
import passport from 'passport';

const router = Router();
router.post('/users/signUP', checkSchema(validSchema), async (req, res) => {
  const result = validationResult(req);
  if (!result.isEmpty()) return res.status(400).send({ error: result.array() });

  const { body } = req;
  body.password = hashing(body.password);
  const ifuserexist = await User.findOne({ email: body.email });
  if (ifuserexist)
    return res.status(404).send('this email is already have an account');
  const newUser = await User.create(body);
  res
    .status(201)
    .json({ msg: 'Your acc has succsefully created,now you can log in' });
});

router.post('/users/signIn', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    if (!user) {
      return res
        .status(401)
        .json({ error: info ? info.message : 'Login failed' });
    }

    req.logIn(user, (err) => {
      if (err) return next(err);
      return res.status(200).json(req.user);
    });
  })(req, res, next);
});
router.post('/users/logOut', (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }

    req.session.destroy((err) => {
      if (err) return next(err);

      res.clearCookie('connect.sid');
      return res.status(200).json({ msg: 'Logged out successfully' });
    });
  });
});

export default router;
