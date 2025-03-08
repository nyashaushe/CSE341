const express = require('express');
const app = express();
const mongodb = require('./data/database');


const port = process.env.PORT || 3000;  

app.use(express.json());
app.use('/', require('./routes'));

mongodb.initDb((err, db) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port, () => {
      console.log(`Database is listening and server on port ${port}`);
    });
  }
});

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });

