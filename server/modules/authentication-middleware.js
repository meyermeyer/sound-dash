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
  let authorizedProjects = ''
  pool.query(query,[req.user.id])
      .then(result=>{
        authorizedProjects = result.rows
        res.Send(result.rows)
      })
      .catch(err=>{
        console.log('error in rejectUnauthroizedUser, authorizedProjects query', err);
        res.sendStatus(500)
      })
}

module.exports = { rejectUnauthenticated };
