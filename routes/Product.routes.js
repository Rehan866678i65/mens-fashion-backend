
const express = require('express');
const ProductController = require('../controller/Product.Controller');

const router = express.Router();

router.post('/', (req, res) => {
  const rconn = new ProductController();
  rconn.insertData(req, res);
});

router.get('/user-Product/:userId', (req, res) => {
  const rconn = new ProductController();
  rconn.getData(req, res);
});

router.get('/:id', (req, res) => {
  const rconn = new ProductController();
  rconn.getDataId(req, res);
});

router.put('/:id', (req, res) => {
  const rconn = new ProductController();
  rconn.Put(req, res);
});

router.delete('/:id', (req, res) => {
  const rconn = new ProductController();
  rconn.Delete(req, res);
});

router.get('/productname/:ProductName', (req, res) => {
  const rconn = new ProductController();
  rconn.AddProductNameid(req, res);
});


module.exports = router;
