
require('dotenv').config();
const AWS = require('aws-sdk');
const fs = require('fs');
// const fileType = require('file-type');
const bluebird = require('bluebird');
const multiparty = require('multiparty');


const express = require('express');


const app = express();
const bodyParser = require('body-parser');
const sessionMiddleware = require('./modules/session-middleware');

const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const projectRouter = require('./routes/project.router')
const filesRouter = require('./routes/files.router.js')
const regionRouter = require('./routes/region.router')
const allUsersRouter = require('./routes/all.users.router')
const collaboratorsRouter = require('./routes/collaborators.router')
const uploadRouter = require('./routes/upload.router.js')

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.use('/api/project', projectRouter)
app.use('/api/files', filesRouter)
app.use('/api/region', regionRouter)
app.use('/api/all_users', allUsersRouter)
app.use('/api/collaborators', collaboratorsRouter)
app.use('/upload', uploadRouter)

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});

// configure the keys for accessing AWS
// AWS.config.update({
//   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
// });

// // configure AWS to work with promises
// AWS.config.setPromisesDependency(bluebird);

// // create S3 instance
// const s3 = new AWS.S3();

// // abstracts function to upload a file returning a promise
// const uploadFile = (buffer, name, type) => {
//   const params = {
//     ACL: 'public-read',
//     Body: buffer,
//     Bucket: process.env.S3_BUCKET,
//     ContentType: type.mime,
//     Key: `${name}.${type.ext}`
//   };
//   return s3.upload(params).promise();
// };

// // Define POST route
// app.post('/test-upload', (request, response) => {
//   console.log('test upload')
//   const form = new multiparty.Form();
//   form.parse(request.body, async (error, fields, files) => {
//     if (error) throw new Error(error);
//     try {
//       const path = files.file[0].path;
//       const buffer = fs.readFileSync(path);
//       // const type = fileType(buffer);
//       const timestamp = Date.now().toString();
//       const fileName = `bucketFolder/${timestamp}-lg`;
//       const data = await uploadFile(buffer, fileName, type);
//       return response.status(200).send(data);
//     } catch (error) {
//       return response.status(400).send(error);
//     }
//   });
// });

