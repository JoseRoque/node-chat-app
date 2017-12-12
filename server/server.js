const path = require('path');
const publicPath = path.join(__dirname, '../public');
const express = require('express');

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.static(publicPath));

app.listen(PORT, () => {
  console.log(`server is up on port ${PORT}`)
});
