import { Router } from 'express';
import User from '../../models/User.js';
import { hashing, comparePass } from '../helpers/hashPass.js';
import { validSchema } from '../utils/validation.js';
import { validationResult, checkSchema, matchedData } from 'express-validator';
import { generateAccessToken, generateRefreshToken } from '../utils/jwt.js';
const router = Router();
router.post('/signUP', checkSchema(validSchema), async (req, res) => {
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

router.post('/signIn', async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({
      error: 'Email or password is incorrect',
    });
  }
  const ismatching = comparePass(password, user.password);
  if (!ismatching)
    return res.status(404).json({
      error: 'Email or password is incorrect',
    });

  try {
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 60000 * 60 * 24,
    });
    const userData = {
      id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
    };
    res.send({ message: 'LogIN successfully', userData, accessToken });
  } catch (err) {
    return res.status(500).json({
      error: 'Internal Server Error',
    });
  }
});
router.post('/logOut', (req, res) => {
  res.clearCookie('refreshToken');

  return res.status(200).json({
    message: 'Logged out successfully',
  });
});

export default router;
