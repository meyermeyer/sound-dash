const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

router.get('/', (req,res) => {
    console.log('in GET /api/project');
    console.log('is authenticated?', req.isAuthenticated());
    console.log('user', req.user);
    
    if(req.isAuthenticated()){
        console.log('isAuthenticated in GET /api/project');
        let query = `SELECT * FROM "projects" JOIN "users_projects"
                    ON "projects".id = "users_projects"."project_id"
                    WHERE "users_projects"."user_id"=$1;`
        pool.query(query,[req.user.id])
            .then((result => {
                res.send(result.rows)
            }))
            .catch(error => {
                console.log('error in GET /api/project', error)
                res.sendStatus(500)
            })
    }
    
})

module.exports = router;