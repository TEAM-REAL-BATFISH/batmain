const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3000; // Port number, use environment variable if available
const cors = require('cors');


app.use(express.json());
app.use(cors());

app.use(express.static(path.resolve(__dirname, '../index.html')));

app.get('/', (req, res) => {
  return res.status(200).sendFile(path.resolve(__dirname, '../index.html'))
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}...`);
})

module.exports = app;

