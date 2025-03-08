const router = require('express').Router();

router.get('/', (req, res) => {
  res.send('Hello World!'); // Send a response to the client');
});


router.use('/contacts', require('./contacts'));


module.exports = router;