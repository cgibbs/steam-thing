const express = require("express");
const axios = require("axios");
const path = require("path");
const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.static(path.join(__dirname, '../build')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get("/steamNews/:limit", (req, res) => {
  axios.get(
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
