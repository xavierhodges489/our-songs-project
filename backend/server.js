const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const postsRouter = require("./routes/posts");
const spotifyTokenRouter = require("./routes/spotifyToken");

app.use("/api/posts", postsRouter);
app.use("/api/token", spotifyTokenRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
