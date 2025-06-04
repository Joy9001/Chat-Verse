import passport from "passport";
import { GoogleOneTapStrategy } from "passport-google-one-tap";
import User from "../models/users.model.js";

// Helper to generate a simple username from email
const generateUsernameFromEmail = (email) => {
  return (
    email.split("@")[0].replace(/[^a-zA-Z0-9]/g, "") +
    Math.floor(Math.random() * 1000)
  );
};

export default passport.use(
  new GoogleOneTapStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
    async (profile, done) => {
      // console.log('profile in google one tap: ', profile)
      const googleId = profile.id;
      const name = profile.displayName;
      const email = profile.emails?.[0]?.value; // Use optional chaining
      const avatar = profile.photos?.[0]?.value; // Extract avatar URL
      const provider = profile.provider;

      if (!email) {
        return done(new Error("Email not provided by Google."), false);
      }

      try {
        let user = await User.findOne({ email: email }); // Find by email primarily

        if (!user) {
          // If no user by email, check by provider ID
          user = await User.findOne({ providerId: googleId });
        }

        if (!user) {
          console.log("Creating new user via Google One Tap:", email);
          // User doesn't exist, create a new one
          const username = generateUsernameFromEmail(email); // Generate username
          const newUser = new User({
            name,
            email,
            username, // Save username
            avatar: avatar || "", // Save avatar or empty string
            gender: "other", // Set default gender
            providerId: googleId,
            provider,
          });
          user = await newUser.save(); // Save and assign
          console.log("New user created:", user);
        } else if (!user.providerId) {
          // User exists (e.g., registered locally) but hasn't linked Google yet
          console.log(
            "Linking Google One Tap account to existing user:",
            email
          );
          user.providerId = googleId;
          user.provider = provider;
          if (!user.avatar && avatar) {
            // Update avatar if missing
            user.avatar = avatar;
          }
          user = await user.save(); // Save the updated user
        }

        // Prepare user object to pass to the callback
        const userForSession = {
          _id: user._id,
          name: user.name,
          username: user.username,
          email: user.email,
          avatar: user.avatar,
          gender: user.gender,
        };

        // Pass the necessary user info
        return done(null, userForSession);
      } catch (error) {
        console.error("Error in Google One Tap Strategy: ", error.message);
        return done(error, false);
      }
    }
  )
);
