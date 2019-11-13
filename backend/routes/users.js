const express = require("express");
const router = express.Router();
const { poolPromise } = require("./db");

router.route("/login").get((req, res) => {
  poolPromise
    .then(pool => {
      return pool.request().query("SELECT * FROM POSTS ORDER BY PostID DESC");
    })
    .then(result => {
      res.json(result.recordset);
    })
    .catch(err => {
      console.log(err);
    });
});

router.route("/delete/:id").delete((req, res) => {
  poolPromise
    .then(pool => {
      return pool
        .request()
        .query(`DELETE FROM POSTS WHERE PostID=${req.params.id}`);
    })
    .then(result => {
      console.log("post deleted!");
      res.json(result.recordset);
    })
    .catch(err => {
      console.log(err);
    });
});

router.route("/signup").post((req, res) => {
  const post = {
    PostDescription: req.body.PostDescription,
    PostSong: req.body.PostSong
  };

  poolPromise
    .then(pool => {
      return pool.request().query(
        `INSERT INTO POSTS (PostDescription, PostSong)
          VALUES
            ('${post.PostDescription}', '${post.PostSong}')`
      );
    })
    .then(result => {
      console.log("post posted!");
      res.send(post);
    })
    .catch(err => {
      console.log(err);
    });
});

module.exports = router;
