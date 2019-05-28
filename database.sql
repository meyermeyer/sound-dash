
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "users"
(
    "id" serial NOT NULL,
    "username" varchar(100) NOT NULL,
    "password" varchar(100) NOT NULL,
    "email" varchar(100) NOT NULL,
    CONSTRAINT users_pk PRIMARY KEY ("id")
)
WITH (
  OIDS=FALSE
);



CREATE TABLE "projects"
(
    "id" serial NOT NULL,
    "name" varchar(100) NOT NULL,
    "tags" varchar(500),
    "date_created" DATE NOT NULL,
    "date_last_edit" DATE NOT NULL,
    "author_id" integer NOT NULL,
    "lyrics" varchar(1000),
    "notes" varchar(1000),
    CONSTRAINT projects_pk PRIMARY KEY ("id")
)
WITH (
  OIDS=FALSE
);



CREATE TABLE "users_projects"
(
    "id" serial NOT NULL,
    "user_id" integer NOT NULL,
    "project_id" serial NOT NULL,
    CONSTRAINT users_projects_pk PRIMARY KEY ("id")
)
WITH (
  OIDS=FALSE
);



CREATE TABLE "files"
(
    "id" serial NOT NULL,
    "track_name" varchar(100),
    "path" varchar(500) NOT NULL,
    "project_id" integer NOT NULL,
    CONSTRAINT files_pk PRIMARY KEY ("id")
)
WITH (
  OIDS=FALSE
);



CREATE TABLE "regions"
(
    "id" serial NOT NULL,
    "start" TIME NOT NULL,
    "end" TIME,
    "note" varchar(100),
    "file_id" integer NOT NULL,
    CONSTRAINT regions_pk PRIMARY KEY ("id")
)
WITH (
  OIDS=FALSE
);




ALTER TABLE "projects" ADD CONSTRAINT "projects_fk0" FOREIGN KEY ("author_id") REFERENCES "users"("id");

ALTER TABLE "users_projects" ADD CONSTRAINT "users_projects_fk0" FOREIGN KEY ("user_id") REFERENCES "users"("id");
ALTER TABLE "users_projects" ADD CONSTRAINT "users_projects_fk1" FOREIGN KEY ("project_id") REFERENCES "projects"("id");

ALTER TABLE "files" ADD CONSTRAINT "files_fk0" FOREIGN KEY ("project_id") REFERENCES "projects"("id");

ALTER TABLE "regions" ADD CONSTRAINT "regions_fk0" FOREIGN KEY ("file_id") REFERENCES "files"("id");
