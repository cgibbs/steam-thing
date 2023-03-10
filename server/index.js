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

app.get("/steamApps/:limit", (req, res) => {
  axios.get(
      "https://api.steampowered.com/ISteamApps/GetAppList/v2/?count=" +
      req.params.limit +
      "&format=json"
    )
    .then((r) => {
      console.log("sending steam apps");
      res.json({ data: r.data.applist.apps });
    });
});

app.get("/steamAppInfo/:appID", (req, res) => {
  console.log("sending steam app info for appID" + req.params.appID);
  axios.get("http://store.steampowered.com/api/appdetails?appids=" +
    req.params.appID +
    "&format=json"
  ).then((r) => {
    res.json({data: r.data})
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
