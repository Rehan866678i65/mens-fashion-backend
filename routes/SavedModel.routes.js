
const express = require('express');
const SavedModelController = require('../controller/SavedModels.Controller');

const router = express.Router();

router.post('/', (req, res) => {
  const rconn = new SavedModelController();
  rconn.insertData(req, res);
});

router.get('/', (req, res) => {
  const rconn = new SavedModelController();
  rconn.getData(req, res);
});

router.get('/:id', (req, res) => {
  const rconn = new SavedModelController();
  rconn.getDataId(req, res);
});

router.put('/:id', (req, res) => {
  const rconn = new SavedModelController();
  rconn.Put(req, res);
});

router.delete('/:id', (req, res) => {
  const rconn = new SavedModelController();
  rconn.Delete(req, res);
});

router.get('/modelNoName/:ModelNoName', (req, res) => {
  const rconn = new SavedModelController();
  rconn.ModelNoNamebyNameid(req, res);
});

module.exports = router;
