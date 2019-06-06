const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');
const { rejectUnauthorizedUser, rejectUnauthenticated } = require('../modules/authentication-middleware');

const multer = require('multer');
const multerDest = process.env.multer_dest || '../uploads';
const upload = multer({ dest: multerDest });
const { uploadPost, generateSignedUrls } = require('../modules/fileHandler');

router.post('/', rejectUnauthenticated, rejectUnauthorizedUser, upload.single('file'), async (req, res) => {
    let id = await uploadPost(req, res);
    console.log('uploadPost', id, req.query)
    const query = `INSERT INTO "files" ("track_name","path","project_id")
                    VALUES ($1,$2,$3)`
    pool.query(query,[req.query.track_name,id,req.query.project_id])
        .then(response=>{
            console.log('back from POST /upload', response)
            res.sendStatus(204)
        })
        .catch(err=>{
            console.log('error in POST /upload', err);
            res.sendStatus(500)
        })
});

// router.post('/', upload.single('file'), (req, res) => {
//     uploadPostWithText(req, res);
// });

// router.get('/', (req, res) => {
//     const queryText = `SELECT * from image`;
//     pool.query(queryText)
//         .then(response => { generateSignedUrls(res, response.rows) })
//         console.log('in GET 'generateSignedUrls(res, response.rows))
//         .catch(error => {
//             res.sendStatus(500); console.log('error getting image', error);
//         })
// })

module.exports = router;