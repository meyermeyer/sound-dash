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

router.post('/', (req,res)=> {
    console.log('in POST /api/project', req.body);
    if (req.isAuthenticated()){
        let query = `INSERT INTO "projects" ("name","notes","date_created", "author_id") VALUES ($1,$2,$3,$4);`
        pool.query(query,[req.body.name, req.body.notes, req.body.date_created, req.user.id])
            .then(response => {
                console.log('in POST /api/project', response);
                res.sendStatus(204)
            })
            .catch(error => {
                console.log('error in POST /api/project', error)
                res.sendStatus(500)
            })
    }
    else {
        console.log('POST /api/project forbidden')
        res.sendStatus(403)
    }
})

router.post('/users', (req,res)=>{
    console.log('in POST /api/project/users', req.body);
    if(req.isAuthenticated()){
        let project_id = ''
        pool.query(`SELECT MAX(id) from "projects";`)
            .then(results => {
                project_id=results.rows[0].max
                console.log('max id',results.rows[0].max);
                res.sendStatus(200);
                console.log('project_id', project_id)
                let query = `INSERT INTO "users_projects" ("project_id","user_id") VALUES ($1,$2);`
                pool.query(query, [project_id, req.user.id])
                    .then(response => {
                        console.log('in POST /api/project/users', response)
                        res.sendStatus(204)
                    })
                    .catch(error => {
                        console.log('error in POST /api/project/users', error);
                        res.sendStatus(500)
                    })
            })
            .catch(err=>{
                console.log('error in select ID', err);
                res.sendStatus(500)
            })
    }
    else {
        console.log('POST /api/project/users forbidden')
        res.sendStatus(403)
    }
})


router.put('/:id', (req,res)=>{
    console.log('in PUT /api/project', req.body);
    
    if (req.isAuthenticated()){
        let query = `UPDATE "projects" SET "name"=$1 WHERE "id"=$3 AND "author_id"=$4;`
        pool.query(query,[req.body.name,req.params.id,req.body.author_id])
            .then(response =>{
                console.log('in PUT /api/project', response);
                res.sendStatus(200)
            })
            .catch(error => {
                console.log('error in PUT /api/project', error)
                res.sendStatus(500)
            })
    }
    else {
        res.sendStatus(403)
    }

})
module.exports = router;