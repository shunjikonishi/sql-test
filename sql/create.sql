DROP TABLE IF EXISTS user;
CREATE TABLE user ( id integer PRIMARY KEY AUTOINCREMENT, name text NOT NULL, password text NOT NULL, gender integer, created_at text NOT NULL, deleted_at text NULL);
