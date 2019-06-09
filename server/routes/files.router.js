const express = require('express');
const { rejectUnauthorizedUser, rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();
const { uploadPost, generateSignedUrls } = require('../modules/fileHandler');


router.delete('/', rejectUnauthorizedUser, (req,res)=>{
    if(req.isAuthenticated()){
        // console.log('in DELETE /api/files');
        let query = `DELETE FROM "files" WHERE "id"=$1`
        pool.query(query,[req.query.track_id])
            .then(response=>{
                console.log('back from DELETE /api/files', response)
                res.sendStatus(204)
            })
            .catch(error=>{
                console.log('error in DELETE /api/files', error);
                res.sendStatus(500)
            })
    }
    
    
})
router.get('/',(req,res)=>{
    console.log('in GET /api/files');
    //return all files associated with selected project if user is authorized to view the project
    if(req.isAuthenticated()){
        console.log('user_id', req.user.id,'project_id', req.query.project_id);
        
        // let query = `SELECT * FROM "files" JOIN "projects" ON "files".project_id = "projects".id 
        //             JOIN "users_projects" ON "users_projects".project_id = "projects".id
        //             WHERE "users_projects".user_id = $1
        //             AND "files".project_id = $2;`
        let query = `SELECT * FROM "users_projects" JOIN "projects" ON "users_projects".project_id = "projects".id
                    JOIN "files" ON "files".project_id = "projects".id
                    WHERE "users_projects".user_id = $1
                    AND "files".project_id = $2
                    ORDER BY "files".id;`
        // pool.query(query,[1,5]) //just for dev purposes so it stops losing the data on state change
        pool.query(query, [req.user.id, req.query.project_id])
            .then(result=>{
                // console.log('in GET /api/files', result.rows);
                res.send(result.rows)
            })
            .catch(error=> {
                // console.log('error in GET /api/files', error);
                res.sendStatus(500)
            })
    }
    else{
        // console.log('GET /api/files forbidden');
        res.sendStatus(403)
    }
})

// POST for adding files
router.post('/', rejectUnauthorizedUser, (req,res)=> {
    console.log('in POST /api/files', req.body, req.query)
    if(req.isAuthenticated()){
        console.log('in POST /api/files', req.body, req.query.project_id)
        const query = `INSERT INTO "files" ("track_name","path", "project_id") VALUES ($1,$2,$3);`
        pool.query(query, [req.body.name, req.body.path, req.query.project_id])
            .then(response => {
                console.log('in POST /api/files', response);
                res.sendStatus(200)
            })
            .catch(error=>{
                console.log('error in POST /api/files', error);
                res.sendStatus(500)
            })
    }
    else {
        sendStatus(403)
    }
    
})





//PUT route to update file name
router.put('/', rejectUnauthorizedUser, (req,res)=>{
    // console.log('in PUT /api/files', req.body.trackName, req.query.project_id, req.query.track_id );
    if (req.isAuthenticated()){
            const query = `UPDATE "files" SET "track_name"=$1 WHERE "id"=$2`
            pool.query(query, [req.body.trackName, req.query.track_id])
                .then(response => {
                    // console.log('back from PUT /api/files', response);
                    res.sendStatus(200)
                })
                .catch(error => {
                    // console.log('error in PUT /api/files', error)
                    res.sendStatus(500)
                })
        }
    else {
        // console.log('PUT /api/files forbidden');
        res.sendStatus(403)
    }
    
})

module.exports = router;