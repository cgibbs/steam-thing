const https = require("https");
const express = require("express");
const { default: axios } = require("axios");
const PORT = process.env.PORT || 3001;

const app = express();

app.get("/steamNews/:limit", (req, res) => {
  axios
    .get(
      "https://api.steampowered.com/ISteamNews/GetNewsForApp/v0002/?appid=440&count=" +
        req.params.limit +
        "&maxlength=300&format=json"
    )
    .then((r) => {
      console.log("sending steam news");
      res.json({ data: r.data.appnews.newsitems });
    });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
