const sql = require("mssql");

const config = {
  user: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  server: process.env.DATABASE_URI,
  port: 1433,
  database: "OurSongsDB",
};

const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then((pool) => {
    console.log("connected to MSSQL database");
    return pool;
  })
  .catch((err) => console.log("database connection failed"));

module.exports = { sql, poolPromise };
