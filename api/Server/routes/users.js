import { Router } from 'express';
import { ensureAuthenticated } from '../utils/middlewares.js';
import { updateSchema } from '../utils/validation.js';
import User from '../../models/User.js';
import { validationResult, checkSchema, matchedData } from 'express-validator';
const router = Router();
router.get('/users/profile', ensureAuthenticated, (req, res) => {
  // بما أنه مسجل دخول، بياناته كاملة متوفرة في req.user بفضل الـ deserializeUser
  res.status(200).json({
    msg: 'Welcome to your profile',
    user: {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
    },
  });
});

router.put(
  '/users/updateprofile',
  ensureAuthenticated,
  checkSchema(updateSchema),
  async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).send({ error: result.array() });
    }

    const dataToUpdate = matchedData(req);

    if (Object.keys(dataToUpdate).length === 0) {
      return res.status(400).json({ error: 'No data provided to update' });
    }

    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.user._id,
        { $set: dataToUpdate },
        { new: true, runValidators: true },
      ).select('-password');
      req.user = updatedUser;

      return res.status(200).json({
        msg: 'Profile updated successfully',
        user: updatedUser,
      });
    } catch (err) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  },
);
export default router;
