import jwt from 'jsonwebtoken';
import User from '../../models/User.js';
import multer from 'multer';

export const verfiyAccessToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({
      error: 'Unauthorized',
    });
  }
  if (!authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      error: 'Invalid Token',
    });
  }
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      return res.status(401).json({
        error: 'User not found',
      });
    }
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({
      error: 'Invalid or expired token',
    });
  }
};

export const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    return next();
  }
  return res.status(403).json({ error: 'Access denied. Admins only.' });
};

const storage = multer.diskStorage({});

export const upload = multer({ storage });
