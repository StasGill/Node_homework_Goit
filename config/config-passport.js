const passport = require("passport");
const passportJWT = require("passport-jwt");
const dotenv = require("dotenv");
dotenv.config();

const secret_key = process.env.SECRET_KEY;

const UserModel = require("../models/userModels");

const { ExtractJwt, Strategy } = passportJWT;

const jwtOptions = {
  secretOrKey: secret_key,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};
passport.use(
  new Strategy(jwtOptions, async (payload, done) => {
    const user = await UserModel.find({ id: payload._id });
    if (user) {
      done(null, user);
    }
  })
);
