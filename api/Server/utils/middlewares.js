export const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  return res
    .status(401)
    .json({ error: 'You must be logged in to access this resource' });
};

export const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    return next();
  }
  return res.status(403).json({ error: 'Access denied. Admins only.' });
};
