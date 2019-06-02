const express = require('express');
const { rejectUnauthorizedUser } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

//add new region to database
router.post('/', (req,res)=>{
    console.log('in POST /api/region', req.body, req.query.project_id);
    if (req.isAuthenticated()){
        let query = `INSERT INTO "regions" ("start","end","file_id") 
                VALUES ($1,$2,$3);`
        pool.query(query, [req.body.region.start, req.body.region.end, req.body.region.file_id])
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