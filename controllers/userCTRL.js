const jwt = require("jsonwebtoken");
const UserModel = require("../services/schemas/userSchema");
const dotenv = require("dotenv");
dotenv.config();
const secret_key = process.env.SECRET_KEY;

async function register(req, res) {
  try {
    const payload = { ...req.body };
    const token = jwt.sign(payload, secret_key);
    console.log(token);
    // const contacts = await UserModel.find({});
    res.json({
      status: "success",
      code: 200,
      data: {
        token,
      },
    });
  } catch (error) {
    console.log(error);
  }
}
module.exports = {
  register,
};
