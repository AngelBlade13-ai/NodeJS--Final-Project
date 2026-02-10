const helloModel = require("../models/helloModel");

function getHello(req, res) {
  const message = helloModel.getMessage();
  res.status(200).send(message);
}

module.exports = {
  getHello,
};
