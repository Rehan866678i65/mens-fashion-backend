// routes/register.js
const express = require('express');
const RegisterController = require('../controller/Register.Controller');
// const RegisterController = require('../controller/Register.Controller');

const router = express.Router();

router.post('/', (req, res) => {
  const controller = new RegisterController() ;
  controller.insertData(req, res);
});

router.get("/", (req, res) => {
  const controller = new RegisterController();
  controller.getAllUsers(req, res);
})

router.get('/:id', (req, res) => {
  const rconn = new RegisterController();
  rconn.getDataId(req, res);
});

router.put('/:id', (req, res) => {
  const rconn = new RegisterController();
  rconn.Put(req, res);
});

router.delete('/:id', (req, res) => {
  const rconn = new RegisterController();
  rconn.Delete(req, res);
});

module.exports = router;
