const express = require('express');
const TicketTController = require('../controller/Ticket.Controller');

const router = express.Router();

router.post('/', (req, res) => {
  const rconn = new TicketTController();
  rconn.insertData(req, res);
});

router.get('/user-Ticket/:userId', (req, res) => {
  const rconn = new TicketTController();
  rconn.getData(req, res);
});

router.get('/:id', (req, res) => {
  const rconn = new TicketTController();
  rconn.getDataId(req, res);
});

router.put('/:id', (req, res) => {
  const rconn = new TicketTController();
  rconn.Put(req, res);
});

router.delete('/:id', (req, res) => {
  const rconn = new TicketTController();
  rconn.Delete(req, res);
});

module.exports = router;
