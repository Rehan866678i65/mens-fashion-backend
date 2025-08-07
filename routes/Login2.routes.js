const express = require("express");
const LoginController = require("../controller/Login2.Controller");

const router = express.Router();


router.post("/login2", (req, res) => {
  const controller = new LoginController();
  controller.loginUser(req, res);
});

module.exports = router;
