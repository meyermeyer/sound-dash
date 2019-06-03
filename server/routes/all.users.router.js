const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', rejectUnauthenticated, (req,res)=>{
    console.log('in GET /api/all_users');
    let query = `SELECT * FROM "users";`
    pool.query(query)
        .then(result=>{
            console.log('back from GET /api/all_users', result.rows);
            res.send(result.rows)
        })
        .catch(err=>{
            console.log('error in /api/all_users', err)
            res.sendStatus(500)
        })
    
})

module.exports = router;