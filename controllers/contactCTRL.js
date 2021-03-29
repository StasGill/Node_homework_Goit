const { bodyParamCheck } = require("../services/contactRQSTCheck");
const UserModel = require("../services/schemas/contactSchema");

console.log("some");

async function getAllUser(req, res) {
  try {
    const contacts = await UserModel.find({});
    res.json({
      status: "success",
      code: 200,
      data: {
        contacts,
      },
    });
  } catch (error) {
    console.log(error);
  }
}

async function getFilteredUser(req, res) {
  try {
    const { name } = req.query;

    const data = await UserModel.find({ name: name });

    if (data.length == 0) {
      res.statusCode = 200;
      res.json({
        status: "Fail",
        code: 200,
        message: "Not found",
      });
      res.send();
    } else {
      res.statusCode = 200;
      res.send(data);
    }
  } catch (error) {
    console.log(error);
  }
}

async function getByIdUser(req, res) {
  try {
    const { id } = req.params;
    const data = await UserModel.findById(id);

    if (data) {
      res.statusCode = 200;
      res.send(data);
    }
  } catch (error) {
    res.statusCode = 404;
    res.json({
      status: "Fail",
      code: 404,
      message: "Not found",
    });
    res.send();
  }
}

async function addNewUser(req, res) {
  try {
    const newContact = {
      name: req.body.name,
      email: req.body.email,
      number: req.body.number,
    };

    const bodyFieldFail = bodyParamCheck(req.body);

    if (req.body.name && req.body.email && req.body.number) {
      const data = await UserModel.create(newContact);
      res.statusCode = 201;
      res.send(data);
    } else {
      res.statusCode = 400;
      res.json({
        status: "Fail",
        code: 204,
        message: `missing ${bodyFieldFail} field, required!`,
      });
      res.send();
    }
  } catch (error) {
    res.statusCode = 400;
    res.json({
      status: "Fail",
      code: 204,
      message: `Something wrong`,
    });
    res.send(error);
  }
}

async function updateUser(req, res) {
  try {
    const { body } = req;
    const { id } = req.params;

    if (Object.keys(body).length == 0) {
      res.statusCode = 400;
      res.json({
        status: "Bad",
        code: 400,
        message: "Missing update fields",
      });
      res.send();
    } else {
      const data = await UserModel.findByIdAndUpdate(
        id,
        { ...body },
        { new: true }
      );

      res.statusCode = 201;
      res.send(data);
    }
  } catch (error) {
    res.statusCode = 404;
    res.json({
      status: "Bad",
      code: 404,
      message: "Not found",
    });
    res.send();
  }
}

async function deleteUser(req, res) {
  try {
    const { id } = req.params;
    const data = await UserModel.findByIdAndDelete(id);

    res.statusCode = 200;
    res.json({
      status: "Ok",
      code: 200,
      message: "Contact deleted",
    });
    res.send();
  } catch (error) {
    res.statusCode = 404;
    res.json({
      status: "Bad",
      code: 404,
      message: "Not found",
    });
    res.send();
  }
}

module.exports = {
  getAllUser,
  getFilteredUser,
  getByIdUser,
  addNewUser,
  updateUser,
  deleteUser,
};
