const jwt = require("jsonwebtoken");
const UserModel = require("..//models/userModels");
const dotenv = require("dotenv");
dotenv.config();
const secret_key = process.env.SECRET_KEY;

async function register(req, res) {
  const { email, password } = req.body;

  const user = await UserModel.findOne({ email });
  if (user) {
    return res.status(409).json({
      status: "error",
      code: 409,
      message: "Such email almost in data base.",
      data: "Conflict email",
    });
  }

  try {
    const newUser = new UserModel({ email, password });
    await newUser.setPassword(password);
    console.log(newUser);
    const result = await newUser.save();
    res.json({
      status: "Success",
      code: 200,
      data: {
        ...result._doc,
      },
    });
  } catch (error) {
    console.log(error);
  }
}

async function login(req, res) {
  const { email, password } = req.body;

  const user = await UserModel.findOne({ email });

  if (!user || !user.validPassword(password)) {
    return res.status(400).json({
      status: "Error",
      code: 400,
      message: "Wrong email or password.",
      data: "Wrong email or password.",
    });
  }

  const payload = { id: user._id, email: user.email };

  const token = jwt.sign(payload, secret_key, { expiresIn: "1h" });
  const updateUser = await UserModel.findByIdAndUpdate(
    user._id,
    { token: token },
    { new: true }
  );

  res.status(200).json({
    status: "Success",
    code: 200,
    data: token,
    user: {
      ...updateUser._doc,
    },
  });
}

async function getUser(req, res) {
  console.log("good");
}

module.exports = {
  register,
  login,
  getUser,
};
