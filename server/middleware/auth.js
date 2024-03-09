module.exports = {
  ensureAuthenticated: (req, res, next) => {
    if (req.isAuthenticated()) {
      return next()
    }
    // redirect to some login page if not authenticated, endpoint need to be chnaged
    res.redirect('/login')
  },

  ensureAdmin: (req, res, next) => {
    // check if user is authenticated and isAdmin will be some admin logic that will check with some database/table, currently this logic is missing from db
    if (req.isAuthenticated() && req.user.isAdmin) {
      return next()
    }
    // redirect to some login page if not authenticated, endpoint need to be changed to
    res.redirect('/login')
  },

  ensureGuest: (req, res, next) => {
    if (!req.isAuthenticated()) {
      return next()
    }
    // if user is authenticated, redirect to some profile or dashboard, endpoint need to be changed to match wanted route
    res.redirect('/dashboard')
  }
}
