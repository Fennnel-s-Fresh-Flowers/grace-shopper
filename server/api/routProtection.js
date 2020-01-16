function isAdmin(req, res, next) {
  if (req.user.admin) {
    return next()
  } else {
    res.redirect('/') //maybe to login page
  }
}

function isSelf(req, res, next) {
  if (req.params.id == req.user.id) {
    return next()
  } else {
    res.redirect('/login')
  }
}

function isSelfOrAdmin(req, res, next) {
  if (req.params.id == req.user.id || req.user.admin) {
    return next()
  } else {
    res.redirect('/login')
  }
}

//Need to write a loggedin function that has to do with authentication of user
// function isLoggedin(req, res, next) {
//   if(loggedin) { //passport auth?
//     return next()
//   } else {
//     res.redirect('/')
//   }

// }

module.exports = {
  //isLoggedin,
  isAdmin,
  isSelf,
  isSelfOrAdmin
}
