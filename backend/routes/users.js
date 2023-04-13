var express = require('express');
var router = express.Router();

const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const verifyAccessToken = require('./middleware/verifyAccessTokenMiddleware');

/* Create a new User. */
router.post('/', async function(req, res, next) {
  try {
    const newUser = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      age: req.body.age,
      email: req.body.email,
      cellphone: req.body.cellphone,
      username: req.body.username,
      password: bcrypt.hashSync(req.body.password, 10)
    })

    await newUser.save();

    return res.status(201).json({msg: "New user successfully created!"});
  } catch(error) {
    console.log(error);
    return res.status(500).json({
      msg: "New user cannot be created...",
      error
    })
  }
});

/* Authenticate User. */
router.post('/authenticate', async function(req, res, next) {
  try {
    const user = await User.findOne({
      username: req.body.username
    })

    if(!user || !bcrypt.compareSync(req.body.password, user.password)) {
      return res.status(400).json({msg: "Unable to authenticate the user with the entered data..."})
    }

    const token = jwt.sign({
      username: user.username
    }, 'TOP_SECRET')

    return res.status(200).json({
      msg: "User successfully authenticated",
      id: user._id,
      token,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      age: user.age,
      email: user.email,
      cellphone: user.cellphone
    });
  } catch(error) {
    return res.status(500).json({
      msg: "Error trying to authenticated...",
      error
    })
  }
});

/* Get Users. */
router.get('/', async (req, res) => {
  const users = await User.find({});
  res.send(users);
});

router.use(verifyAccessToken);

/* Update User. */
router.put('/:id', async (req, res) => {
  const userId = req.params.id;

  User.findByIdAndUpdate(userId, req.body, { new: true })
    .then(updatedUser => {
      if (!updatedUser){
        return res.status(404).json({error: 'User not found'});
      }
      res.json(updatedUser);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'User Cannot Updated' });
    });
});

router.get('/:id', async (req, res) => {
  const userId = req.params.id;

  User.findById(userId)
    .then(updatedUser => {
      if (!updatedUser){
        return res.status(404).json({error: 'User not found'});
      }
      res.json(updatedUser);
    })
    .catch(err => {
      console.error(err);
    });
});

/* Delete a User. */
router.delete('/:id', async (req, res) => {
  const userId = req.params.id;

  User.findByIdAndDelete(userId)
  .then(deletedUser => {
    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(deletedUser);
  })
  .catch(err => {
    console.error(err);
    res.status(500).json({ error: 'User Cannot deleted' });
  });
});

module.exports = router;
