const express = require('express');
const BrandController = require('../controller/Brand.Controller');

const router = express.Router();

router.post('/', (req, res) => {
  const rconn = new BrandController();
  rconn.insertData(req, res);
});

router.get('/user-Brand/:userId', (req, res) => {
  const rconn = new BrandController();
  rconn.getData(req, res);
});

router.get('/:id', (req, res) => {
  const rconn = new BrandController();
  rconn.getDataId(req, res);
});

router.put('/:id', (req, res) => {
  const rconn = new BrandController();
  rconn.Put(req, res);
});

router.delete('/:id', (req, res) => {
  const rconn = new BrandController();
  rconn.Delete(req, res);
});

router.get('/brandname/:BrandName', (req, res) => {
  const rconn = new BrandController();
  rconn.BrandbyNameid(req, res);
});

module.exports = router;
