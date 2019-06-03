const express = require('express');
const { rejectUnauthenticated, rejectUnauthorizedUser } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

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