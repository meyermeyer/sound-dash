const express = require('express');
const { rejectUnauthorizedUser } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

//add new region to database
router.post('/', (req,res)=>{
    console.log('in POST /api/region', req.body, req.query.project_id);
    
})

module.exports = router;