var
  fs     = require('fs'),
  assert = require('chai').assert,
  knex   = require('knex')({
    client: 'sqlite3',
    connection: { filename: __dirname + '/../db.sqlite' }
  });

function getSQL (path) {
  return fs.readFileSync(path).toString();
}

var createSQLs = getSQL(__dirname + '/../sql/create.sql').split("\n");
var insertSQLs = getSQL(__dirname + '/../sql/insert.sql').split("\n");
createSQLs.forEach(function (sql) {
  if (!sql) return false;
  knex.raw(sql)
    .then(function () {
      return true;
    })
});
insertSQLs.forEach(function (sql) {
  if (!sql) return false;
  knex.raw(sql)
    .then(function () {
      return true;
    })
});
knex.destroy();
