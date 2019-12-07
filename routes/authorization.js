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

function generateRandomString(length) {
  var text = "";
  var possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

router.route("/loginwithspotify").get((req, res) => {
  const client_id = process.env.CLIENT_ID;
  const scope = "playlist-modify-public";
  const redirect_uri = "https://oursongs.herokuapp.com/";
  const state = generateRandomString(16);

  let url = "https://accounts.spotify.com/authorize";
  url += "?response_type=token";
  url += "&client_id=" + encodeURIComponent(client_id);
  url += "&scope=" + encodeURIComponent(scope);
  url += "&redirect_uri=" + encodeURIComponent(redirect_uri);
  url += "&state=" + encodeURIComponent(state);

  res.redirect(url);
});

module.exports = router;
