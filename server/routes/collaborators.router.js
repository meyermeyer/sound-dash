const express = require('express');
const { rejectUnauthenticated, rejectUnauthorizedUser } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();


//delete collaborators 
router.delete('/', rejectUnauthenticated, rejectUnauthorizedUser, (req,res)=>{
    console.log('in DELETE /api/collaborators', req.query)
    let query = `DELETE FROM "users_projects" WHERE "users_projects"."user_id"=$1 AND "users_projects"."project_id"=$2;`
    pool.query(query,[req.query.user_id,req.query.project_id])
        .then(response=>{
            console.log('back from DELETE /api/collaborators', response)
            res.sendStatus(204)
        })
        .catch(err=>{
            console.log('error in DELETE /api/collaborators', err)
            res.sendStatus(500)
        })
})

//get collaborators for current project
router.get('/', rejectUnauthenticated, rejectUnauthorizedUser, (req, res)=>{
    console.log('in GET /api/collaborators')
    let query=`
        SELECT * FROM "users_projects" 
        JOIN "users" 
        ON "users_projects"."user_id"="users".id 
        WHERE "project_id"=$1`
    pool.query(query,[req.query.project_id])
        .then(result=>{
            console.log('back from GET /api/collaborators', result.rows)
            res.send(result.rows)
        })
        .catch(err=>{
            console.log('error in GET /api/collaborators', err)
            res.sendStatus(500)
        })
})

//add collaborator to "users_projects"
router.post('/', rejectUnauthenticated, rejectUnauthorizedUser, (req, res) => {
    console.log('in POST /api/collaborators', req.body)
    let query = `INSERT INTO "users_projects" ("user_id", "project_id")
                VALUES ($1,$2);`
    pool.query(query,[req.body.user_id, req.query.project_id])
        .then(response=>{
            console.log('in POST /api/collaborators', response)
            res.sendStatus(200)
        })
        .catch(error=>{
            console.log('error in POST /api/collaborators', error)
            res.sendStatus(500)
        })
})



module.exports = router;