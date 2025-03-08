const router = require('express').Router();

router.get('/', (req, res) => {
  res.send('Hello World!'); // Send a response to the client');
});

module.exports = router;