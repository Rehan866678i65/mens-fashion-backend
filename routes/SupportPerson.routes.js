const express = require('express');
const SupportPersonController = require('../controller/SupportPerson.Controller');

const router = express.Router();

router.post('/', (req, res) => {
  const rconn = new SupportPersonController();
  rconn.insertData(req, res);
});

router.get('/', (req, res) => {
  const rconn = new SupportPersonController();
  rconn.getData(req, res);
});

router.get('/:id', (req, res) => {
  const rconn = new SupportPersonController();
  rconn.getDataId(req, res);
});

router.put('/:id', (req, res) => {
  const rconn = new SupportPersonController();
  rconn.Put(req, res);
});

router.delete('/:id', (req, res) => {
  const rconn = new SupportPersonController();
  rconn.Delete(req, res);
});

module.exports = router;
