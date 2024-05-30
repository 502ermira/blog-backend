const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/auth/google/callback'
}, async (accessToken, refreshToken, profile, done) => {
  const { id, displayName, emails } = profile;
  const email = emails[0].value;

  try {
    console.log(`Looking for user with googleId: ${id}`);
    let user = await User.findOne({ googleId: id });
    if (!user) {
      console.log(`User not found, creating new user with googleId: ${id}`);
      user = new User({ googleId: id, name: displayName, email });
      await user.save();
      console.log(`User created: ${user}`);
    }
    done(null, user);
  } catch (err) {
    console.error('Error in Google Strategy:', err);
    done(err, null);
  }
}));


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
