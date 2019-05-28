const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

router.get('/', (req,res) => {
    console.log('in GET /api/project');
    let query = `SELECT * FROM "projects";`
    pool.query(query)
    .then((result=>{
        res.send(result.rows)
    }))
    .catch(error => {
        console.log('error in GET /api/project', error)
        res.sendStatus(500)
    })
})

module.exports = router;