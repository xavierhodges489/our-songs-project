const express = require("express");
const cors = require("cors");
const app = express();
const sql = require("mssql");

app.use(cors());
app.use(express.json());

const config = {
  user: "admin",
  password: "mypassword",
  server: "databasesystemsproject.cy9rjwfchpnj.us-east-1.rds.amazonaws.com",
  port: 1433,
  database: "DistWeb"
};

app.get("/", (req, res) => {
  res.send("Hello World");
});

sql.on("error", err => {
  console.log(err);
});

app.get("/api/posts", (req, res) => {
  sql
    .connect(config)
    .then(pool => {
      return pool.request().query("SELECT * FROM POSTS");
    })
    .then(result => {
      res.send(result.recordset);
    })
    .catch(err => {
      console.log(err);
    });
});

app.get("/api/posts/:id", (req, res) => {
  sql
    .connect(config)
    .then(pool => {
      return pool
        .request()
        .query(`SELECT * FROM POSTS WHERE PostID=${req.params.id}`);
    })
    .then(result => {
      if (result.recordset.length < 1)
        res.status(404).send("there is no post with that id");
      res.send(result.recordset);
    })
    .catch(err => {
      console.log(err);
    });
});

app.post("/api/posts", (req, res) => {
  const post = {
    PostDescription: req.body.PostDescription,
    PostSong: req.body.PostSong
  };

  sql
    .connect(config)
    .then(pool => {
      return pool.request().query(
        `INSERT INTO POSTS (PostDescription, PostSong)
        VALUES
          ('${post.PostDescription}', '${post.PostSong}')`
      );
    })
    .then(result => {
      res.send(post);
    })
    .catch(err => {
      console.log(err);
    });
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`listening on port ${port}...`));
