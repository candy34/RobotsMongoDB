const mongoose = require('mongoose');
const Robot = require('./model')
//const MongoClient = require('mongodb').MongoClient;

mongoose.Promise = require('bluebird')
const url = 'mongodb://localhost:27017/RobotsMongoDB'

mongoose.connect(url ,{
  useMongoClient: true
})

// let users = [];

function getAllRobots () {
  return Robot.find()
}

  // Create a collection we want to drop later
  // let collection = db.collection('users');
  // let documents = []
  // Insert a bunch of documents for the testing

    // Perform a simple find and return all the documents
    // collection.find({}).toArray(function(err, docs) {
    //   users = docs
    //   console.log(users);
    //   db.close();
    // })

//   return new Promise ((resolve, reject)=> {
//     MongoClient.connect(url, function (err, db){
//       const collection = db.collection('users')
//       collection.find({}).toArray(function (err, docs){
//         resolve(docs)
//         reject(err)
//       })
//     })
//   })
// }
//
// function connectMongodb (url, cb) {
//   MongoClient.connect(url,cb)
// }
//
// function getUsers (){
//   return Users.find()
// }
  // connectMongodb(url, getAllDocs)
  // console.log('users')



function getRobotById (robotId) {
  return Robot.find({'id': robotId}).catch(function (err) {
    console.log('error', err)
  })
}
    // let chosenUser = {}
    // for (let i = 0; i < users.length; i++) {
    //     if (users[i].id === userId) {
    //         chosenUser = users[i]
    //     }
    // }
    // return chosenUser
function getUserByUsername (username) {
  return User.find({ username: username}) .catch(function (err) {
    console.log('ERROR!!!!', err)
  })
}
function getUserByEmail (email) {
  return User.findByEmail(email)
}


function addUser (newUser) {
    const user = new User(newUser)
    user.save(function (err) {
      console.log(err)
    })
    return Promise.resolve('success')
}

function deleteUser (userId) {
  return User.deleteOne({ _id: userId})
}



module.exports = {
    // getAllRobots: getAllRobots,
    // getUsers: getUsers,
  //   getUser: getUser,
  //  getUserByUsername:getUserByUsername,
  //  getUserByEmail:getUserByEmail,
  //   addUser: addUser,
  //   deleteUser: deleteUser,
  getAllRobots,
  getRobotById

}
