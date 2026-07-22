import { Router } from 'express';
import { updateSchema } from '../utils/validation.js';
import User from '../../models/User.js';
import { validationResult, checkSchema, matchedData } from 'express-validator';
import { verfiyAccessToken } from '../utils/middlewares.js';
import jwt from 'jsonwebtoken';
import { generateAccessToken } from '../utils/jwt.js';
import { comparePass } from '../helpers/hashPass.js';
const router = Router();
router.get('/users/profile', verfiyAccessToken, (req, res) => {
  res.status(200).json(req.user);
});

router.post('/users/refresh', async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({
        error: 'Something wrong',
      });
    }

    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

    const user = await User.findById(decoded.id).select('-password');

    if (!user) {
      return res.status(401).json({
        error: 'User not found',
      });
    }

    const accessToken = generateAccessToken(user);

    return res.status(200).json({
      accessToken,
    });
  } catch (err) {
    return res.status(401).json({
      error: 'Invalid or expired refresh token',
    });
  }
});

router.put('/users/updateprofile', verfiyAccessToken, async (req, res) => {
  const { body } = req;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { $set: body },
      { new: true, runValidators: true },
    ).select('-password');
    req.user = updatedUser;

    return res.status(200).json({ user: updatedUser });
  } catch (err) {
    return res.status(500).send('Internal Server Error');
  }
});
router.post('/users/Change_Pass', verfiyAccessToken, async (req, res) => {
  const { body } = req;
  const user = await User.findById(req.user.id);
  const ifPassExist = comparePass(body.password, user.password);
  if (!ifPassExist) {
    return res.status(404).send({
      error: 'It is not the current password',
    });
  }
  if (body.password === body.newPass) {
    return res.status(400).send({ error: 'New password must be different' });
  }
  const nPass = hashing(body.newPass);
  try {
    await User.findByIdAndUpdate(req.user._id, {
      password: nPass,
    });
    res.send('Password changed seccessfully');
  } catch (err) {
    res.status(400).send('Could not change password');
  }
});
export default router;
