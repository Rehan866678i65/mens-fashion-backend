const express = require('express');
const AddAreaController = require('../controller/AddArea.Controller');

const router = express.Router();

router.post('/', (req, res) => {
  const rconn = new AddAreaController();
  rconn.insertData(req, res);
});

router.get('/', (req, res) => {
  const rconn = new AddAreaController();
  rconn.getData(req, res);
});

router.get('/:id', (req, res) => {
  const rconn = new AddAreaController();
  rconn.getDataId(req, res);
});

router.put('/:id', (req, res) => {
  const rconn = new AddAreaController();
  rconn.Put(req, res);
});

router.delete('/:id', (req, res) => {
  const rconn = new AddAreaController();
  rconn.Delete(req, res);
});

router.get('/Name/:Name', (req, res) => {
  const rconn = new AddAreaController();
  rconn.AddAreaNameid(req, res);
});

module.exports = router;
