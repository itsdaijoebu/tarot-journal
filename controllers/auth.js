const passport = require('passport')
const validator = require('validator')
const User = require('../models/User')

 exports.getSignin = (req, res) => {
  console.log('user: ', req.user)
    if (req.user) {
      return res.redirect('/dashboard')
    }
    res.render('signin')
  }
  
  exports.postSignin = (req, res, next) => {
    const validationErrors = []
    // if (!validator.isEmail(req.body.email)) validationErrors.push({ msg: 'Please enter a valid email address.' })
    if (validator.isEmpty(req.body.password)) validationErrors.push({ msg: 'Password cannot be blank.' })
  
    if (validationErrors.length) {
      req.flash('errors', validationErrors)
      return res.redirect('/')
    }
    // req.body.email = validator.normalizeEmail(req.body.email, { gmail_remove_dots: false })
  
    passport.authenticate('local', (err, user, info) => {
      console.log('auth user: ', user)
      if (err) { return next(err) }
      if (!user) {
        req.flash('errors', info)
        return res.redirect('/')
      }
      req.login(user, (err) => {
        if (err) { return next(err) }
        req.flash('success', { msg: 'Success! You are logged in.' })
        res.redirect(req.session.returnTo || '/dashboard')
      })
    })(req, res, next)
  }
  
  exports.signout = (req, res) => {
    req.logout((err) => {
      if (err) console.log('Error : Failed to destroy the session during signout.', err)
      req.user = null
      res.redirect('/')
    })
  }
  
  exports.getSignup = (req, res) => {
    if (req.user) {
      return res.redirect('/dashboard')
    }
    res.render('signup', {
      title: 'Create Account'
    })
  }
  
  exports.postSignup = (req, res, next) => {
    const validationErrors = []
    if (!validator.isEmail(req.body.email)) validationErrors.push({ msg: 'Please enter a valid email address.' })
    if (!validator.isLength(req.body.password, { min: 8 })) validationErrors.push({ msg: 'Password must be at least 8 characters long' })
    // if (req.body.password !== req.body.confirmPassword) validationErrors.push({ msg: 'Passwords do not match' })
  
    if (validationErrors.length) {
      req.flash('errors', validationErrors)
      return res.redirect('../signup')
    }
    req.body.email = validator.normalizeEmail(req.body.email, { gmail_remove_dots: false })
  
    const user = new User({
      username: req.body.username,
      usernameLower: req.body.username.toLowerCase(),
      email: req.body.email,
      password: req.body.password,
      access: 'free',
      readings: []
    })
  
    User.findOne({$or: [
      {email: req.body.email},
      {usernameLower: req.body.username.toLowerCase()}
    ]}, (err, existingUser) => {
      if (err) { return next(err) }
      if (existingUser) {
        req.flash('errors', { msg: 'Account with that email address or username already exists.' })
        return res.redirect('../signup')
      }
      user.save((err) => {
        if (err) { return next(err) }
        req.login(user, (err) => {
          if (err) {
            return next(err)
          }
          res.redirect('/dashboard')
        })
      })
    })
  }