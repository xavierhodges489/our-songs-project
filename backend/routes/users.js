const express = require("express");
const router = express.Router();
const { poolPromise } = require("./db");

router.route("/login").post((req, res) => {
  const user = {
    UserName: req.body.UserName,
    Password: req.body.Password
  };

  poolPromise
    .then(pool => {
      return pool.request().query(`
        SELECT UserID, Username 
        FROM USERS 
        WHERE 
            UserName = '${user.UserName}' 
            AND PasswordHash = '${user.Password}'`);
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
    UserName: req.body.UserName,
    Password: req.body.Password
  };

  poolPromise
    .then(pool => {
      return pool.request().query(
        `INSERT INTO USERS (UserName, PasswordHash, PasswordSalt)
          VALUES
            ('${post.UserName}', '${post.Password}', 'salt')`
      );
    })
    .then(result => {
      res.status(200).send({ user: req.body.UserName });
    })
    .catch(err => {
      console.log(err);
    });
});

module.exports = router;
