const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/userModel");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL || "http://localhost:5000/auth/google/callback",
      scope: ["profile", "email"],
      accessType: "offline",
      prompt: "consent"
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Check if user exists
        let user = await User.findOne({
          $or: [{ googleId: profile.id }, { email: profile.emails[0].value }]
        });

        if (user) {
          // Update existing user
          user = await User.findOneAndUpdate(
            { _id: user._id },
            {
              $set: {
                googleId: profile.id,
                name: profile.displayName,
                email: profile.emails[0].value,
                avatar: profile.photos[0]?.value || "",
                googleTokens: {
                  access_token: accessToken,
                  refresh_token: refreshToken || user.googleTokens?.refresh_token,
                  expiry_date: Date.now() + 3600 * 1000
                }
              }
            },
            { new: true }
          );
        } else {
          // Create new user
          user = await User.create({
            googleId: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value,
            avatar: profile.photos[0]?.value || "",
            googleTokens: {
              access_token: accessToken,
              refresh_token: refreshToken,
              expiry_date: Date.now() + 3600 * 1000
            }
          });
        }

        return done(null, user);
      } catch (error) {
        console.error("Google auth error:", error);
        return done(error, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    if (!user) {
      return done(new Error('User not found'), null);
    }
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

module.exports = passport;