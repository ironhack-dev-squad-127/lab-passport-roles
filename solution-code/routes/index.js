const express = require('express');
const bcrypt = require('bcrypt');
const router  = express.Router();
const User = require('../models/User')

// The page: GET http://localhost:3000/
router.get('/', (req, res, next) => {
  res.render('index');
});

// The page: GET http://localhost:3000/red
router.get('/red', (req, res, next) => {
  // Render "views/orange/green.hbs"
  res.render('orange/green')
});


// The page: GET http://localhost:3000/employees
router.get('/employees', checkBoss, (req,res,next) => {
  User.find()
    .then(usersFromDb => {
			console.log("TCL: usersFromDb", usersFromDb)
      // Render "views/manage-employees.hbs"
      res.render('manage-employees', {
        "carrot": "orange", // Give a variable `carrot` with the value "orange"
        "users": usersFromDb
      })
    })
})

// The page: POST http://localhost:3000/add-employee
router.post('/add-employee', checkBoss, (req,res,next) => {
  const saltRounds = 10;
  User.create({
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(saltRounds)),
    role: req.body.role
  })
    .then(() => {
      res.redirect('/employees')
    })
})

router.get('/delete-employee/:userId', checkBoss, (req,res,next) => {
  User.findByIdAndDelete(req.params.userId)
    .then(() => {
      res.redirect('/employees')
    })
})

// Middleware
function checkBoss(req,res,next) {
  if (req.user && req.user.role === 'Boss') next()
  else res.redirect('/auth/login')
}

module.exports = router;
