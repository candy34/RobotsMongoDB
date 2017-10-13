const express = require('express')
const app = express()
// const path = require('path');
const mustacheExpress = require('mustache-express')
const bodyParser = require('body-parser')
// const { peopleRoutes, passportConfig} =require('./people')
const {getAllRobots, getRobotById } = require('./dal')
// const session = require('express-session')
//
// const Robot = require('./model')
// const passport = require('passport')
// const MongoStore = require('connect-mongo') (session)
//
// app.use(
//   session({
//     resave:true,
//     saveUninitialized:true,
//     secret:process.env.SESSION_SECRET || 'super secret',
//     // store: new MongoStore({
//     //   url: process.env.MONGOLAB_URI ||
//     //   'mongodb: //localhost: 27017/sesh',
//     //   autoReconnect: true,
//     //   clear_interval:3600
//     // })
//   })
// )
// app.use(passport.initialize())
// app.use(passport.session())

app.set('view engine', 'mustache')
app.engine('mustache', mustacheExpress())

app.set('views', __dirname + '/View')


app.use(express.static('Public'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))

// app.use('/people' , peopleRoutes)


//
// app.get('/', function (req, res) {
//   // const user = { name: 'Calvin'}
//   // const user2 = { name: 'Candace'}
//   // const userDal = dal.getUsers()
//
//   res.render('data')
// })

app.get('/', (req, res) => {
  getAllRobots().then(function(data){
    console.log('this is it', data);
    res.render('list', {data : data})
  })
})

app.get('/:id', (req, res) => {
  const roboto = getRobotById(req.params.id)
  res.render('_user', roboto)
})

// app.get('/:id', function(request,response){
//   const id = Number (request.params.id)
//   console.log(id);
//   console.log(request.params.id);
//   const userDal = dal.getUser(id)
//   // const userDal =data.users[request.params.id-1]
//   console.log(userDal);
//   response.render('data', {users: userDal,id})
//   console.log('You Have Arrived');
// })

app.listen(3000, function () {
  console.log('Successfully started express application!');
})
