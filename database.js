const destiny = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: "./world_sql_content_c93aa78cba1c9c8c27c15d32a948143a.sqlite3"
  }
});

module.exports = { destiny };
