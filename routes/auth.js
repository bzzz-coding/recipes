const express = require('express')
const passport = require('passport')
const router = express.Router()

// @desc    Auth with Google
// @route   GET /auth/google
router.get('/google', passport.authenticate('google', { scope: ['profile'] }))

// @desc    Google auth callback
// @route   GET /auth/google/callback
router.get(
  '/google/callback',
  // if failed, redirect to '/' with is the login page
  passport.authenticate('google', { failureRedirect: '/', failureMessage: true }),
  (req, res) => {
    // if successful, redirect to /dashboard
    res.redirect('/dashboard')
  }
)

// @desc    Logout user
// @route   /auth/logout
router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log("Error : Failed to destroy the session during logout.", err)
    }
    req.user = null
    res.redirect('/')
  })
})

module.exports = router
