import { Router } from 'express';
import { updateSchema, changePasswordSchema } from '../utils/validation.js';
import User from '../../models/User.js';
import { validationResult, checkSchema, matchedData } from 'express-validator';
import { isAdmin, verfiyAccessToken } from '../utils/middlewares.js';
import jwt from 'jsonwebtoken';
import { generateAccessToken } from '../utils/jwt.js';
import { hashing, comparePass } from '../helpers/hashPass.js';

const router = Router();
router.get('/users/profile', verfiyAccessToken, (req, res) => {
  res.status(200).json(req.user);
});
router.get('/users', verfiyAccessToken, isAdmin, async (req, res) => {
  const users = await User.find();
  res.status(200).send(users);
});
router.post('/users/refresh', async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({
        message: 'Refresh token is missing',
      });
    }

    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

    const user = await User.findById(decoded.id).select('-password');

    if (!user) {
      return res.status(401).json({
        message: 'Unauthorized',
      });
    }

    const accessToken = generateAccessToken(user);

    return res.status(200).json({
      accessToken,
    });
  } catch (err) {
    return res.status(401).json({
      message: 'Invalid or expired refresh token',
    });
  }
});

router.put(
  '/users/updateprofile',
  verfiyAccessToken,
  checkSchema(updateSchema),
  async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      console.log(result.array());
      return res.status(400).json({
        error: result.array(),
      });
    }
    try {
      const { name, email, phone } = req.body;

      const updatedUser = await User.findByIdAndUpdate(
        req.user._id,
        {
          name,
          email,
          phone,
        },
        {
          new: true,
          runValidators: true,
        },
      ).select('-password');

      return res.status(200).json({
        message: 'Profile updated successfully',
        user: updatedUser,
      });
    } catch (err) {
      return res.status(500).json({
        message: 'Internal Server Error',
      });
    }
  },
);
router.put(
  '/users/change-password',
  verfiyAccessToken,
  checkSchema(changePasswordSchema),
  async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      console.log(result.array());
      return res.status(400).json({
        error: result.array(),
      });
    }
    try {
      const { currentPassword, newPassword } = req.body;

      const user = await User.findById(req.user._id);

      const isMatch = comparePass(currentPassword, user.password);

      if (!isMatch) {
        return res.status(400).json({
          message: 'Current password is incorrect',
        });
      }

      if (currentPassword === newPassword) {
        return res.status(400).json({
          message: 'New password must be different',
        });
      }

      const hashedPassword = hashing(newPassword);

      await User.findByIdAndUpdate(req.user._id, {
        password: hashedPassword,
      });

      return res.status(200).json({
        message: 'Password changed successfully',
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: 'Internal Server Error',
      });
    }
  },
);
export default router;
