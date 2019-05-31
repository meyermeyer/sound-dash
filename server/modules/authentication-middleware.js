const pool = require('../modules/pool')

const rejectUnauthenticated = (req, res, next) => {
  // check if logged in
  if (req.isAuthenticated()) {
    // They were authenticated! User may do the next thing
    // Note! They may not be Authorized to do all things
    next();
  } else {
    // failure best handled on the server. do redirect here.
    res.sendStatus(403);
  }
};

const rejectUnauthorizedUser = (req,res,next) => {
  let query = `SELECT * FROM "users_projects" WHERE "users_projects"."user_id"=$1;`
  
  pool.query(query, [req.user.id])
  .then(result => {
    // console.log('result.rows:',result.rows, req.params.projectId, req.params.trackId)
    console.log('result.rows:', result.rows, req.query.project_id, req.query.track_id)
    result.rows.map(project=>{
      if (req.params.project_id===project.project_id) {
        next()
      }
      else {
        res.sendStatus(403)
      }

    })
    
  })
  .catch(err => {
    console.log('error in rejectUnauthroizedUser, authorizedProjects query', err);
    res.sendStatus(500)
  })
  
    
  
  
}

module.exports = { rejectUnauthenticated, rejectUnauthorizedUser};
