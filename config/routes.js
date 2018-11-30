const axios = require('axios');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const db = require('../database/dbConfig');

const { authenticate } = require('./middlewares');

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
  };

  const { jwtKey } = require('../_secrets/keys');
  const options = {
    expiresIn: '1h',
  };

  return jwt.sign(payload, jwtKey, options);
}

module.exports = (server) => {
  server.post('/api/register', register);
  server.post('/api/login', login);
  server.get('/api/jokes', authenticate, getJokes);
  server.get('/', test);
};

function register(req, res) {
  // implement user registration
  const creds = req.body;
  const hash = bcrypt.hashSync(creds.password, 11);

  creds.password = hash;

  db('users')
    .insert(creds)
    .then((id) => {
      res.status(201).json(id);
    })
    .catch((err) => {
      res.status(500).json({ message: 'could not register user', err });
    });
}

function login(req, res) {
  // implement user login
  const creds = req.body;

  db('users')
    .where({ username: creds.username })
    .first()
    .then((user) => {
      if (user && bcrypt.compareSync(creds.password, user.password)) {
        const token = generateToken(user);
        res.status(200).json({ message: 'welcome!', token });
      } else {
        res.status(401).json({ message: 'you shall not pass!' });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: 'authentication failed', err });
    });
}

function getJokes(req, res) {
  axios
    .get(
      'https://08ad1pao69.execute-api.us-east-1.amazonaws.com/dev/random_ten'
    )
    .then((response) => {
      res.status(200).json(response.data);
    })
    .catch((err) => {
      res.status(500).json({ message: 'Error Fetching Jokes', error: err });
    });
}

function test(req, res) {
  res.json({ message: 'I WORK' });
}
