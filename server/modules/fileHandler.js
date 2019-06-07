const pool = require('../modules/pool')
const fs = require('fs-extra')
const AWS = require('aws-sdk')

const AWSSecretKey = process.env.AWSSecretKey
const AWSAccessKeyId = process.env.AWSAccessKeyId
const Bucket = process.env.Bucket

const uploadPost = async (req, res) => {
    let media_key = await uploadToS3(req.file, res);
    return sendUrlToRouter(req, media_key, res);
}

const generateSignedUrls = async (res, rows) => {
    const newRows = await addSignedUrls(rows);
    console.log({ newRows });
    res.send(newRows);
}

const addSignedUrls = async rows => {
    const newRows = [];
    for (const row of rows) {
        const media_url = await generateSignedUrl(row.media_key);
        row.media_url = media_url;
        console.log('in addSignedUrls',newRows);
        newRows.push(row);
    }
    return new Promise(resolve => {
        resolve(newRows);
    })
}

function generateSignedUrl(key) {
    return new Promise(revolve => {
        let s3bucket = new AWS.S3({
            accessKeyId: AWSAccessKeyId,
            secretAccessKey: AWSSecretKey,
            Bucket: Bucket,
            signatureVersion: 'v4',
            region: 'us-east-2',
        });
        let urlParams = { Bucket: Bucket, Key: key };
        console.log('urlparams are:', { urlParams });
        s3bucket.getSignedUrl('getObject', urlParams, function (error, url) {
            if (error) {
                console.log(error);
                resolve('');
            } else {
                console.log('url in getsigned response: ', url);
                revolve(url);
            }
            console.log(url, error);

        })
    })
}

function uploadToS3(file, res) {
    return new Promise(resolve => {
        fs.readFile(file.path)
            .then(data => {
                console.log(`file read:`, data);
                let s3bucket = new AWS.S3({
                    accessKeyId: AWSAccessKeyId,
                    secretAccessKey: AWSSecretKey,
                    Bucket: Bucket,
                    signatureVersion: 'v4',
                    region: 'us-east-1',
                });
                s3bucket.createBucket(function () {
                    var params = {
                        Bucket: Bucket,
                        Key: file.filename,
                        Body: data,
                    };
                    s3bucket.upload(params, function (error, data) {
                        if (error) {
                            console.log('upload to s3', error);
                            res.sendStatus(500);
                        }
                        resolve(data.Key);
                    })
                })
            })
            .catch(error => {
                console.log('error', error)
                res.sendStatus(500);
            })
    })
}

const sendUrlToRouter = async (req, media_key, res) => {
    // const signedUrl = await generateSignedUrl(media_key)
    // console.log('signedUrl', signedUrl, media_key)
    // return signedUrl
    const url = `https://sound-dash.s3.us-east-2.amazonaws.com/${media_key}`
    return url
    // return new Promise(resolve => {
        
    //     const queryText = `INSERT INTO "files" ("path") VALUES ($1) RETURNING id`;
    //     console.log('in uploadToSQL', media_key)
    //     pool.query(queryText, [signedUrl])
    //         .then((result) => {
    //             console.log('back from db with id:', result, result.rows[0].id
    //             );
    //             res.send({ id: result.rows[0].id });
    //         })
    //         .catch((error) => {
    //             console.log('error in POST', error);
    //             res.sendStatus(500);
    //         })
    // })
}

// function uploadToSQLWithText(req, media_key, res) {
//     return new Promise(resolve => {
//         const title = req.body.title;
//         const content = req.body.content;
//         const queryText = `INSERT INTO post
//                          ("media_key", "title", "content")
//                          VALUES
//                          ($1, $2, $3)`;

//         pool.query(queryText, [media_key, title, content])
//             .then((result) => {
//                 console.log('back from db with:', result);
//                 res.sendStatus(200);
//             })
//             .catch((error) => {
//                 console.log('error in POST', error);
//                 res.sendStatus(500);
//             })
//     })
// }

module.exports = { uploadPost, generateSignedUrls };