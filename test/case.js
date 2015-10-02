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

describe("select.sql", function () {
  var sql = getSQL(__dirname + '/../sql/select.sql');
  it("should contains 100 users", function (done) {
    knex.raw(sql).then(function (users) {
      assert.lengthOf(users, 100);
      done();
    });
  });
});

describe("where.sql", function () {
  var sql = getSQL(__dirname + '/../sql/where.sql');
  it("should contains 88 non-deleted users", function (done) {
    knex.raw(sql).then(function (users) {
      assert.lengthOf(users, 88);
      done();
    });
  });
  it("should not be deleted user", function (done) {
    knex.raw(sql).then(function (users) {
      users.every(function(user) {
        assert.isNull(user.deleted_at, 'MUST NOT be deleted');
      });
      done();
    });
  });
});

describe("column.sql", function () {
  var sql = getSQL(__dirname + '/../sql/column.sql');
  it("should contains 88 non-deleted users", function (done) {
    knex.raw(sql).then(function (users) {
      assert.lengthOf(users, 88);
      done();
    });
  });
  it("should not have password", function (done) {
    knex.raw(sql).then(function (users) {
      users.every(function(user) {
        assert.isUndefined(user.password, 'MUST NOT have password');
      });
      done();
    });
  });
  it("should not be deleted user", function (done) {
    knex.raw(sql).then(function (users) {
      users.every(function(user) {
        assert.isNull(user.deleted_at, 'MUST NOT be deleted');
      });
      done();
    });
  });
});
