// server.js
const express = require('express');
const cors = require('cors'); // Enable CORS for React development
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const userRouter = require('../Backend/routers/userRouter');
const categoriesRouter = require("../Backend/routers/categoriesRouter");
const todoRouter = require("../Backend/routers/todoRouter");
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));



  app.use("/api",userRouter);
  app.use("/api",categoriesRouter);
  app.use("/api",todoRouter);


app.listen(port, () => console.log(`Server listening on port ${port}`));
