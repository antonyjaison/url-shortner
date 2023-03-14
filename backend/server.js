require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const urlRouter = require("./routes/urlRoutes");
const { getUrl } = require('./controller/urlControllers')

const app = express();

// middleware
app.use(express.json());
app.use(cors());

// routes
app.use("/api/url", urlRouter);
app.get('/:shortUrl',getUrl)

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("connected to db on port", process.env.PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });
