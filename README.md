# Prime Project
This version uses React, Redux, Express, Passport, and PostgreSQL (a full list of dependencies can be found in `package.json`).


## Prerequisites

Before you get started, make sure you have the following software installed on your computer:

- [Node.js](https://nodejs.org/en/)
- [PostrgeSQL](https://www.postgresql.org/)
- [Nodemon](https://nodemon.io/)

## Create database and table

Create a new database called `sound_dash` and create the following tables:

```SQL
CREATE TABLE "users" (
	"id" SERIAL PRIMARY KEY,
	"username" VARCHAR(100) NOT NULL,
	"password" VARCHAR(100) NOT NULL,
	"email" VARCHAR(150)
	);

CREATE TABLE "projects" (
	"id" SERIAL PRIMARY KEY,
	"name" varchar(100),
	"date_created" date,
	"date_last_edit" date,
	"author_id" INT REFERENCES "users",
	"lyrics" VARCHAR(1000),
	"notes" VARCHAR(1000)
);

CREATE TABLE "users_projects" (
	"id" SERIAL PRIMARY KEY,
	"user_id" INT REFERENCES "users",
	"project_id" INT REFERENCES "projects" ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE "files" (
	"id" SERIAL PRIMARY KEY,
	"track_name" varchar(100),
	"path" varchar(500) NOT NULL,
	"project_id" INT REFERENCES "projects" ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE "regions" (
	"region_id" SERIAL PRIMARY KEY,
	"id" VARCHAR(100),
	"start" float NOT NULL,
	"end" float,
	"tag" varchar(50),
	"notes" varchar (100),
	"file_id" INT REFERENCES "files" ON DELETE CASCADE ON UPDATE CASCADE
);
```

If you would like to name your database something else, you will need to change `prime_app` to the name of your new database name in `server/modules/pool.js`
## Create an Amazon Web Services S3 Bucket
* Follow their docs to get access keys
* make the bucket contents public or the signed urls expire:
    In your S3 bucket, under ‘permissions’ paste this code into the ‘bucket policy’ tab
{
    "Version": "2012-10-17",
    "Id": "Policy1559785308233",
    "Statement": [
        {
            "Sid": "Stmt1559785301600",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::sound-dash/*"
        }
    ]
}



## Development Setup Instructions

* Run `npm install`
* Create a `.env` file at the root of the project and paste this line into the file:
    ```
    SERVER_SESSION_SECRET=superDuperSecret
    AWSAccessKeyId= access key Id
    AWSSecretKey= secret key
    Bucket= bucket name


    ```
    While you're in your new `.env` file, take the time to replace `superDuperSecret` with some long random string like `25POUbVtx6RKVNWszd9ERB9Bb6` to keep your application secure. Here's a site that can help you: [https://passwordsgenerator.net/](https://passwordsgenerator.net/). If you don't do this step, create a secret with less than eight characters, or leave it as `superDuperSecret`, you will get a warning.
* Start postgres if not running already by using `brew services start postgresql`
* Run `npm run server`
* Run `npm run client`
* Navigate to `localhost:3000`
