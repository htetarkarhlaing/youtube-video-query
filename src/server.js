const express = require("express");
const cors = require("cors");
const youtubeSearchWithoutApiKey = require("youtube-search-without-api-key");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/:keyword", async (req, res) => {
  console.log(req.params.keyword);
  const videos = await youtubeSearchWithoutApiKey.search(req.params.keyword);
  if (videos) {
    return res.status(200).json({
      videos,
    });
  } else {
    return res.status(404).json({
      message: "not found",
    });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server is started on PORT: ${process.env.PORT}`);
});
