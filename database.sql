
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "users"
(
  "id" SERIAL PRIMARY KEY,
  "username" VARCHAR(100) NOT NULL,
  "password" VARCHAR(100) NOT NULL,
  "email" VARCHAR(150) NOT NULL
);


CREATE TABLE "projects"
(
  "id" SERIAL PRIMARY KEY,
  "name" varchar(100),
  "date_created" date,
  "date_last_edit" date,
  "author_id" INT REFERENCES "users",
  "lyrics" VARCHAR(1000),
  "notes" VARCHAR(1000)
);


CREATE TABLE "users_projects"
(
  "id" SERIAL PRIMARY KEY,
  "user_id" INT REFERENCES "users",
  "project_id" INT REFERENCES "projects"
);


CREATE TABLE "files"
(
  "id" SERIAL PRIMARY KEY,
  "track_name" varchar(100),
  "path" varchar(500) NOT NULL,
  "project_id" INT REFERENCES "projects"
);


CREATE TABLE "regions"
(
  "id" SERIAL PRIMARY KEY,
  "start" time NOT NULL,
  "send" time,
  "tag" varchar(50),
  "notes" varchar (100),
  "file_id" INT REFERENCES "files"
);
