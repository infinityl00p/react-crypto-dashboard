const express = require('express');
const bodyParser = require('body-parser');

const app = express();

let port = 5000 || process.env.PORT

app.get('/api/coins', (req, res) => {
  res.send({message: "I'm riach biatch"});
});

app.listen(port, () => {
  console.log(`Server started at port: ${port}`);
});