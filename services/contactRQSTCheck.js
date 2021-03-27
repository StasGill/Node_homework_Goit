//================================================Проверка на наличие данныех в body
const bodyParamCheck = (body) => {
  let message = "";
  if (!body.name) {
    message += " name,";
  }
  if (!body.email) {
    message += " email,";
  }
  if (!body.number) {
    message += " number,";
  }

  if (message) {
    return message;
  }
  return message ? message : false;
};

module.exports = {
  bodyParamCheck,
};
