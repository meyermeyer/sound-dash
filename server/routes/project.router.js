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
    else {
        console.log('GET /api/project forbidden');
        res.sendStatus(403)
    }
})

router.delete('/:id', (req,res) => {
    console.log('in DELETE /api/project', req.params, req.user);
    
    
    if(req.isAuthenticated()){
        console.log('isAuthenticated in DELETE /api/project');
        //some syntax error in this query, waiting for help
        let query = `DELETE FROM "projects" WHERE "projects".id =$1 AND "projects".author_id = $2;`
        pool.query(query,[req.params.id, req.user.id])
            .then(response => {
                console.log('in DELETE /api/project', response);
                res.sendStatus(200)
            })   
            .catch(error => {
                console.log('error in DELETE isAuthenticated', error);
                res.sendStatus(500)
            }) 
    }
    else {
        console.log('DELETE /api/project forbidden');
        res.sendStatus(403)
    }

    
})

module.exports = router;