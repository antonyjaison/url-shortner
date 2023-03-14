const Url = require("../model/urlModel");
var validUrl = require("valid-url");
const { generateRandomString } = require("../util/generateRandomString");

const getUrl = async (req, res) => {
  const shortUrl = req.params;
  const url = await Url.find(shortUrl);
  if (url.length === 0) {
    res.status(200).json("");
  } else {
    const longUrl = url[0].longUrl;
    console.log(longUrl);
    res.status(200).json(longUrl);
  }
};

const createUrl = async (req, res) => {
  const { longUrl } = req.body;
  if (validUrl.isUri(longUrl)) {
    const shortUrl = generateRandomString(6);

    // to check the shortUrl is exist or not
    const exist = await Url.find({ shortUrl: { $eq: shortUrl } });
    var exists = [];
    exists = exist;

    // if shortUrl exist in the db create new shortUrl until a unique shortUrl
    while (exists.length > 0) {
      const shortUrl = generateRandomString(6);
      const exist = await Url.find({ shortUrl: { $eq: shortUrl } });
      exists = exist;
    }

    // to check the longUrl is exist or not
    const longUrlExist = await Url.find({ longUrl: { $eq: longUrl } });
    console.log(longUrlExist);

    // if longUrlExist.length === 0, that is the longUrl is not present in the db so add it to the db
    if (longUrlExist.length > 0) {
      res.status(200).json(longUrlExist[0]);
    } else {
      try {
        const url = await Url.create({ longUrl, shortUrl });
        console.log(url)
        res.status(200).json(url);
      } catch (err) {
        res.status(400).json({ err: err.message });
      }
    }
  } else {
    console.log("not a valid url");
  }
};

module.exports = { getUrl, createUrl };
