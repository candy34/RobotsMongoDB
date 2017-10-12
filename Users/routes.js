const router = require('express').Router()
const User = require('./model')
const {
  getAllUsers,
  getUser,
  getUserByUsername,
  getUserByEmail,
  addUser,
  deleteUser
} = require('./dal')
const passport = require('passport')
const { isAuthenticated } = require('./passport')

router
  .route('/login')
  .get(function (req, res) {
    // req.session.destroy()
    res.render('login')
  })
  .post((req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
      if (err) {
        return next(err)
      }
      if (!user) {
        return res.redirect('/user/login')
      }
      req.logIn(user, (err, obj) => {
        if (err) {
          return next(err)
        }
        res.redirect('/user/new')
      })
    })(req, res, next)
  })
router.route('/logout').get(function (req, res) {
  req.logout()
  res.redirect('/user')
})
router.route('/register').get(function (req, res) {
  // / use createUser dal methods
  // send back success or redirect
  res.render('add')
})

router
  .route('/')
  .get(async ({ query }, res) => {
    console.log('QUERYSTRING!!!!!!!', query)
    const { email, username } = query
    if (email || username) {
      const [ user ] = email
        ? (await getUserByEmail(email))
        : (await getUserByUsername(username))
      user.title = user.name
      return res.render('show', user)
    }
    const users = await getAllUsers()
    res.render('list', { user, title: 'User List' })
  })
  .post(async ({ body }, res) => {
    const result = await addUser(body)
    res.send(result)
  })

router.route('/new').get(isAuthenticated, (req, res) => {
  console.log(req.session)
  res.render('add')
})

router
  .route('/:UserId')
  .get(async ({ params }, res) => {
    const [ user ] = await getUser(params.UserId)
    res.render('show', user)
  })
  .delete(async ({ params }, res) => {
    const result = await deleteUser(params.UserId)
    res.send(result)
  })

module.exports = router
