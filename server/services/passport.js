const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const key = require('../config/keys');

const User = mongoose.model('Users');

passport.serializeUser((user, done)=>{
  done(null, user.id);
})

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then( user => {
      done(null, user);
    });
});

passport.use(new GoogleStrategy({
    clientID: key.googleClientID,
    clientSecret: key.googleClientSecret,
    callbackURL: "/auth/google/callback",
    proxy: true
  },
  (accessToken, refreshToken, profile, done) => {
    User.findOne({googleId: profile.id})
     .then(existingUser => {
       existingUser ? done (null, existingUser) : 
       new User({ googleId: profile.id, name: profile.displayName}).save().then( user=> done(null, user) );
     });
    }
  )
)