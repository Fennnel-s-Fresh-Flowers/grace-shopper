function isAdmin(req, res, next) {
  if (!req.user) {
    res.redirect('/error')
  } else if (!req.user && !req.user.admin) {
    return res.redirect('/error')
  } else {
    return next()
  }
}

function isSelf(req, res, next) {
  if (!req.user) {
    res.redirect('/error')
  } else if (req.params.id !== req.user.id) {
    return res.redirect('/error')
  } else {
    return next()
  }
}

function isSelfOrAdmin(req, res, next) {
  if (!req.user) {
    res.redirect('/error')
  } else if (req.params.id !== req.user.id || !req.user.admin) {
    return res.redirect('/error')
  } else {
    return next()
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

//Write a user id - cart id that will check that the user /session/req. line up so that we garentee that random post requests dont fly.

module.exports = {
  //isLoggedin,
  isAdmin,
  isSelf,
  isSelfOrAdmin
}
