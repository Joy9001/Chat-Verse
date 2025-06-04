import jwt from "jsonwebtoken";
import passport from "passport";
import Auth from "../models/auth.model.js";
import User from "../models/users.model.js";

export const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
  }

  passport.authenticate("jwt", { session: false }, async (err, user, info) => {
    if (err) {
      console.error("Error in isAuthenticated JWT check: ", err.message);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    if (user) {
      req.user = user;
      return next();
    }

    if (
      info?.message === "No auth token" ||
      info?.name === "JsonWebTokenError" ||
      info?.name === "TokenExpiredError"
    ) {
      try {
        const refreshToken = req.cookies.refreshToken;

        if (!refreshToken) {
          return res.status(401).json({ error: "Unauthorized: Missing token" });
        }

        const refreshtokendb = await Auth.findOne({ refreshToken });
        if (!refreshtokendb) {
          res.clearCookie("accessToken");
          res.clearCookie("refreshToken");
          return res
            .status(401)
            .json({ error: "Unauthorized: Invalid session" });
        }

        const decoded = jwt.verify(
          refreshToken,
          process.env.REFRESH_TOKEN_SECRET
        );

        if (refreshtokendb.user.toString() !== decoded.user) {
          res.clearCookie("accessToken");
          res.clearCookie("refreshToken");
          return res
            .status(403)
            .json({ error: "Access Forbidden: Invalid refresh token" });
        }

        if (
          Date.now() - refreshtokendb.updatedAt.getTime() >
          1000 * 60 * 60 * 24
        ) {
          const newRefreshToken = jwt.sign(
            { user: decoded.user },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: "7d" }
          );
          refreshtokendb.refreshToken = newRefreshToken;
          await refreshtokendb.save();
          res.cookie("refreshToken", newRefreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 1000 * 60 * 60 * 24 * 7,
          });
        }

        const accessToken = jwt.sign(
          { user: decoded.user },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "30m" }
        );
        res.cookie("accessToken", accessToken, {
          httpOnly: true,
          secure: true,
          sameSite: "strict",
          maxAge: 1000 * 60 * 30,
        });

        const fullUser = await User.findById(decoded.user).select("-password");
        if (!fullUser) {
          console.error(
            "User not found in DB after successful refresh token validation for ID:",
            decoded.user
          );
          res.clearCookie("accessToken");
          res.clearCookie("refreshToken");
          return res.status(401).json({
            error: "Unauthorized: User associated with token not found",
          });
        }

        req.user = fullUser;
        return next();
      } catch (error) {
        res.clearCookie("accessToken");
        res.clearCookie("refreshToken");
        if (
          error instanceof jwt.JsonWebTokenError ||
          error instanceof jwt.TokenExpiredError
        ) {
          return res
            .status(401)
            .json({ error: "Unauthorized: Invalid or expired session" });
        } else {
          console.error(
            "Unexpected error during refresh token processing:",
            error
          );
          return res
            .status(500)
            .json({ error: "Internal Server Error during token refresh" });
        }
      }
    }

    return res.status(401).json({ error: "Unauthorized" });
  })(req, res, next);
};
