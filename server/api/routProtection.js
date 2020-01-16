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
