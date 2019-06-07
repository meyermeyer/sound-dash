// export S3_BUCKET = "my-bucket-name"
// export AWS_ACCESS_KEY_ID = "ALOTOFCHARACTERS"
// export AWS_SECRET_ACCESS_KEY = "aLotMORErandomCHARACTERSformingAhash"

// Load the SDK and UUID
var AWS = require('aws-sdk');
var uuid = require('uuid');

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

// Create unique bucket name
var bucketName = 'sound-dash' + uuid.v4();
// Create name for uploaded object key
var keyName = 'hello_world.txt';

// Create a promise on S3 service object
var bucketPromise = new AWS.S3({ apiVersion: '2006-03-01' }).createBucket({ Bucket: bucketName }).promise();

// Handle promise fulfilled/rejected states
bucketPromise.then(
    function (data) {
        // Create params for putObject call
        var objectParams = { Bucket: bucketName, Key: keyName, Body: 'Hello World!' };
        // Create object upload promise
        var uploadPromise = new AWS.S3({ apiVersion: '2006-03-01' }).putObject(objectParams).promise();
        uploadPromise.then(
            function (data) {
                console.log("Successfully uploaded data to " + bucketName + "/" + keyName);
            });
    }).catch(
        function (err) {
            console.error(err, err.stack);
        });