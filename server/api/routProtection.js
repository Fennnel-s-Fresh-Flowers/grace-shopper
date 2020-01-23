function isAdmin(req, res, next) {
  if (!req.user) {
    res.redirect('/error')
  } else if (!req.user.admin) {
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

module.exports = {
  //isLoggedin,
  isAdmin,
  isSelfOrAdmin
}
