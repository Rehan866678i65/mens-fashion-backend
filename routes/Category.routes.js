const express = require('express');
const CategoryController = require('../controller/AddCategory.Controller');

const router = express.Router();

router.post('/', (req, res) => {
  const rconn = new CategoryController();
  rconn.insertData(req, res);
});

router.get('/', (req, res) => {
  const rconn = new CategoryController();
  rconn.getData(req, res);
});

router.get('/:id', (req, res) => {
  const rconn = new CategoryController();
  rconn.getDataId(req, res);
});

router.put('/:id', (req, res) => {
  const rconn = new CategoryController();
  rconn.Put(req, res);
});

router.delete('/:id', (req, res) => {
  const rconn = new CategoryController();
  rconn.Delete(req, res);
});

router.get('/Name/:Name', (req, res) => {
  const rconn = new CategoryController();
  rconn.CategoryNameid(req, res);
});

module.exports = router;
