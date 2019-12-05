const express = require("express");
const router = express.Router();
const request = require("request");

router.route("/").get((req, res) => {
  const authOptions = {
    url: "https://accounts.spotify.com/api/token",
    form: {
      grant_type: "client_credentials"
    },
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      //client and secret keys go here
      Authorization:
        "Basic " +
        Buffer.from(
          `${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`
        ).toString("base64")
    },
    json: true
  };

  request.post(authOptions, (error, response, body) => {
    res.send(body);
  });
});

module.exports = router;
