// Seeds file that remove all users and create 2 new users

// To execute this seed, run from the root of the project
// $ node bin/seeds.js

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/User");

const saltRounds = 10;

mongoose
  .connect('mongodb://localhost/lab-passport-roles', {useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

let users = [
  {
    username: "alvaro",
    password: bcrypt.hashSync("alvaro", bcrypt.genSaltSync(saltRounds)),
    role: 'Boss'
  },
  {
    username: "joaquim",
    password: bcrypt.hashSync("joaquim", bcrypt.genSaltSync(saltRounds)),
    role: 'TA'
  },
  {
    username: "maxence",
    password: bcrypt.hashSync("maxence", bcrypt.genSaltSync(saltRounds)),
    role: 'Developer'
  }
]

User.deleteMany()
.then(() => {
  return User.create(users)
})
.then(usersCreated => {
  console.log(`${usersCreated.length} users created with the following id:`);
  console.log(usersCreated.map(u => u._id));
})
.then(() => {
  // Close properly the connection to Mongoose
  mongoose.disconnect()
})
.catch(err => {
  mongoose.disconnect()
  throw err
})