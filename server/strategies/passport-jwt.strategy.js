import dotenv from "dotenv";
import passport from "passport";
import { Strategy as JwtStrategy } from "passport-jwt";
import User from "../models/users.model.js";
dotenv.config();

const cookieExtractor = (req) => {
  if (req && req.cookies) {
    const accessToken = req.cookies.accessToken;

    if (!accessToken) {
      return null;
    }

    return accessToken;
  }
  return null;
};

const options = {
  jwtFromRequest: cookieExtractor,
  secretOrKey: process.env.ACCESS_TOKEN_SECRET,
  passReqToCallback: true,
};

export default passport.use(
  new JwtStrategy(options, async (req, jwt_payload, done) => {
    try {
      let user = await User.findById(jwt_payload.user).select("-password");
      if (!user) {
        console.log(`JWT Strategy: User not found for ID ${jwt_payload.user}`);
        return done(null, false);
      }

      req.user = user;
      return done(null, user);
    } catch (error) {
      console.log("Error in passport-jwt.strategy: ", error.message);
      return done(error, false);
    }
  })
);
