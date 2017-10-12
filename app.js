const express = require('express');
// const path = require('path');
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');
const { peopleRoutes, passportConfig} =require('./people')
const dal = require('./dal');
const session = require('express-session')
const app = express();
const Person = require('./people/model')
const passport = require('passport')
const MongoStore = require('connect-mongo') (session)

app.use(
  session({
    resave:true,
    saveUninitialized:true,
    secret:process.env.SESSION_SECRET || 'super secret',
    store: new MongoStore({
      url: process.env.MONGOLAB_URI ||
      'mongodb: //localhost: 27017/sesh',
      autoReconnect: true,
      clear_interval:3600
    })
  })
)
app.use(passport.initialize())
app.use(passport.session())
app.engine('mustache', mustacheExpress())
app.set('views', __dirname + '/View')
app.set('view engine', 'mustache')

app.use(express.static('Public'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/people' , peopleRoutes)



app.get('/', function (req, res) {
  // const user = { name: 'Calvin'}
  // const user2 = { name: 'Candace'}
  // const userDal = dal.getUsers()
  const users = dal.getUsers(req.params.id)
  res.redirect('./data')
})

app.get('/data', function(req, res){
  res.render('data')
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
