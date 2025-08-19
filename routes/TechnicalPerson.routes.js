
const express = require('express');
const TechnicalPersonController = require('../controller/TechnicalPerson.Controller');

const router = express.Router();

router.post('/', (req, res) => {
  const rconn = new TechnicalPersonController();
  rconn.insertData(req, res);
});

router.get('/user-TechnicalPerson/:userId', (req, res) => {
  const rconn = new TechnicalPersonController();
  rconn.getData(req, res);
});

router.get('/:id', (req, res) => {
  const rconn = new TechnicalPersonController();
  rconn.getDataId(req, res);
});

router.put('/:id', (req, res) => {
  const rconn = new TechnicalPersonController();
  rconn.Put(req, res);
});

router.delete('/:id', (req, res) => {
  const rconn = new TechnicalPersonController();
  rconn.Delete(req, res);
});
router.get('/FirstName/:FirstName', (req, res) => {
  const rconn = new TechnicalPersonController();
  rconn.TechnicalPersonNameid(req, res);
});

module.exports = router;
