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

  const body = req.body;
  const hashedPassword = hashing(body.password);
  const ifEmailuserexist = await User.findOne({ email: body.email });
  const ifPhoneuserexist = await User.findOne({ phone: body.phone });
  if (ifEmailuserexist)
    return res
      .status(409)
      .json({ message: 'This email is already have an account' });
  if (ifPhoneuserexist)
    return res
      .status(409)
      .json({ message: 'This phone number is already have an account' });
  const newUser = await User.create({ ...body, password: hashedPassword });
  res.status(201).json({ message: 'Account created successfully' });
});

router.post('/signIn', async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        message: 'Email or password is incorrect',
      });
    }
    const ismatching = comparePass(password, user.password);
    if (!ismatching)
      return res.status(401).json({
        message: 'Email or password is incorrect',
      });

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
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
    res
      .status(200)
      .json({ message: 'Login  successfully', userData, accessToken });
  } catch (err) {
    return res.status(500).json({
      message: 'Internal Server Error',
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
