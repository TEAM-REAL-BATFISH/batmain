import express from 'express';
const app = express();
import path from 'path';
const PORT = 3000;
import cors from 'cors';
import db from './models/models.js'


app.use(express.json());
app.use(cors());

const currentDir = new URL('.', import.meta.url).pathname;

app.use(express.static(path.resolve(currentDir, '../index.html')));

app.get('/', (req, res) => {
  return res.status(200).sendFile(path.resolve(currentDir, '../index.html'))
});

app.get('/' , async (req, res) => {
  const query = 'SELECT * FROM users'

  const response = await db.query(query);
  console.log(response);
  res.status(200).send('Good');
})

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}...`);
});

export default app;

