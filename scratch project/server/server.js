const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3000; // Port number, use environment variable if available
const cors = require('cors');


app.use(express.json());
app.use(cors());

