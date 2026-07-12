import passport from 'passport';
import { Strategy } from 'passport-local';
import User from '../../models/User.js';
import { comparePass } from '../helpers/hashPass.js';

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

export default passport.use(
  new Strategy(
    {
      usernameField: 'name',
      passwordField: 'password',
    },
    async (username, password, done) => {
      try {
        const user = await User.findOne({ name: username });
        if (!user) {
          return done(null, false, { message: 'User not Found' });
        }

        if (!comparePass(password, user.password)) {
          return done(null, false, { message: 'Password is wrong' });
        }

        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    },
  ),
);
