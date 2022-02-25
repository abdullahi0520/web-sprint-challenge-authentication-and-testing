const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const session = require('express-session')
const Store = require('connect-session-knex')(session)
const knex = require('../data/dbConfig');
const restrict = require('./middleware/restricted');

const authRouter = require('./auth/auth-router');
const jokesRouter = require('./jokes/jokes-router.js');


const server = express();

server.use(session({
    name: 'chocolatechip',
    secret: 'shh',
    saveUninitialized: false,
    resave: false,
    store: new Store({
      knex,
      createTable: true,
      clearInterval: 1000 * 60 * 10,
      tablename: 'sessions',
      sidfieldname: 'sid'
    }),
    cookie: {
      maxAge: 1000 * 60 * 10,
      secure: false,
      httpOnly: true
      // sameSite: 'none'
    }
  }))

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/auth', authRouter);
server.use('/api/jokes', restrict, jokesRouter); // only logged-in users should have access!


server.use((err, req, res, next) => { // eslint-disable-line
    console.log(err)
    res.status(err.status).json({
      message: err.message,
      stack: err.stack,
    });
  });

module.exports = server;
