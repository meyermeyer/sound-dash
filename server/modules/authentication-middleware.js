const pool = require('../modules/pool')

const rejectUnauthenticated = (req, res, next) => {
  console.log('unauthenticated middleware')
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
  console.log('in rejectUnauthorizedUser. userId:', req.user.id, 'project_id:',req.query.project_id,'track_id:', req.query.track_id);
  
  let query = `SELECT * FROM "users_projects" WHERE "users_projects"."user_id"=$1;`
  pool.query(query, [req.user.id])
  .then(result => {
    // console.log('result.rows:',result.rows, req.params.projectId, req.params.trackId)
    console.log('result.rows:', result.rows, req.query.project_id, req.query.track_id)
    let isAuthorized;
    result.rows.map(project=>{
      console.log('project:', project.project_id, req.query.project_id);
      if (req.query.project_id==project.project_id) {
        console.log('YESSS');
        isAuthorized = true;
        
      }
    })
    if (isAuthorized){
      next()
    }
    else{
      res.sendStatus(403)
    }
  })
  .catch(err => {
    console.log('error in rejectUnauthorizedUser, authorizedProjects query', err);
    res.sendStatus(500)
  })
  
    
  
  
}

module.exports = { rejectUnauthenticated, rejectUnauthorizedUser};
