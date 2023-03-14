const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const urlSchema = Schema(
  {
    longUrl: {
      type: String,
      required: true,
    },
    shortUrl: {
      type: String,
      required: true,
    },
  },
  { timstamps: true }
);

module.exports = mongoose.model("url", urlSchema);
