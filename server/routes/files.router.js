const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/:id',(req,res)=>{
    console.log('in GET /api/files');
    //return all files associated with selected project if user is authorized to view the project
    if(req.isAuthenticated()){
        console.log('user.id', req.user.id,'project_id', req.params.id);
        
        let query = `SELECT * FROM "files" JOIN "projects" ON "files".project_id = "projects".id 
                    JOIN "users_projects" ON "users_projects".project_id = "projects".id
                    WHERE "users_projects".user_id = $1
                    AND "files".project_id = $2;`
        pool.query(query,[1,5]) //just for dev purposes so it stops losing the data on state change
        // pool.query(query,[req.user.id,req.params.id])
            .then(result=>{
                console.log('in GET /api/files', result.rows);
                res.send(result.rows)
            })
            .catch(error=> {
                console.log('error in GET /api/files', error);
                res.sendStatus(500)
            })
    }
    else{
        console.log('GET /api/files forbidden');
        res.sendStatus(403)
    }
})

//POST for adding files
router.post('/:id', (req,res)=> {
    console.log('in POST /api/files', req.body.url)
    const query = `INSERT INTO "files" ("path", "project_id") VALUES ($1,$2);`
    pool.query(query,[req.body.url,req.params.id])
})

module.exports = router;