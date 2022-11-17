const destiny = require("knex")({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "localhost",
    password: "MMOrogue04",
    database: "destiny",
    port: 5432,
  },
});

module.exports = { destiny };
