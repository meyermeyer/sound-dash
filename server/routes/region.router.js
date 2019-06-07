const express = require('express');
const { rejectUnauthorizedUser, rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

//DELETE regions from database before saving new regions.list object
router.delete('/', rejectUnauthorizedUser, (req,res)=>{
    console.log('in DELETE region route', req.query.region_id)
    let query = `DELETE FROM "regions"
                WHERE "regions"."id"=$1;`
    pool.query(query, [req.query.region_id])
        .then(result=>{
            console.log('in DELETE /api/region', result)
            res.sendStatus(204)
        })
        .catch(err=>{
            console.log('error in DELETE /api/region', err)
            res.sendStatus(500)
        })
})
    
    


//GET regions from database
router.get('/', rejectUnauthorizedUser, (req,res)=>{
    console.log('in GET /api/region', req.query.project_id);
    let query = `SELECT * FROM "files" JOIN "regions" ON "regions"."file_id"="files".id
                WHERE "files"."project_id"=$1`
    pool.query(query,[req.query.project_id])
        .then(result=>{
            console.log('back from GET /api/region with:', result.rows);
            res.send(result.rows)
        })
        .catch(error=>{
            console.log('error in GET /api/region', error);
            res.sendStatus(500);
            
        })

    
})
//add new region to database
router.post('/', rejectUnauthorizedUser,(req,res)=>{
    console.log('in POST /api/region', req.body, req.query.project_id);
    if (req.isAuthenticated()){
        let query = `INSERT INTO "regions" ("id","start","end","file_id") 
                VALUES ($1,$2,$3,$4);`
        pool.query(query, [req.body.region.id, req.body.region.start, req.body.region.end, req.body.region.file_id])
            .then(response => {
                console.log('in POST /api/region', response);
                res.sendStatus(204)
            })
            .catch(error => {
                console.log('error in POST /api/region', error);
                res.sendStatus(500)

            })
    }
    else {
        res.sendStatus(403)
    }
})

module.exports = router;