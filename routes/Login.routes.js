const express = require("express");
const LoginController = require("../controller/Login.Controller");

const router = express.Router();

router.post("/login", (req, res) => {
  const controller = new LoginController();
  controller.loginUser(req, res);
});

module.exports = router;
