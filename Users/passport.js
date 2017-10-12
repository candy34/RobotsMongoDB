const passport = require('passport')
const { Strategy: LocalStrategy} = require ('passport-local')
const User = require('./model')

passport.serializeUser((user, done ) => {
  done(null, user.id)
})
passport.deserializeUser((id,done) => {
  User.findById(id, (err, user) => {
    done(err,user)
  })
})
passport.use(new LocalStrategy(( username,password,done) =>{
  User.findOne({ username: username.toLowerCase() }, 'password', (
    err, user
  ) => {
    if (err) {
      return done(err)
    }
    if (!user) {
      return done(null,false, {msg: 'Username ${username} not found.'})
    }
    user.comparePassword(password,user.password, (err, isMatch =>{
      if (err) {
        return done (err)

      }
      if (isMatch) {
        return done(null, user)
      }
      return done(null,false, {msg:'Invalid email or password'})
    })

  })

}))
const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next()
  }
  res.redirect('/user/login')
}
module.exports = { isAuthenticated }
