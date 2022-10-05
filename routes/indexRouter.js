const express = require('express');
const { index, create, download } = require('../controllers/indexController.js');


const Router = express.Router();

Router.get('/users', index)

Router.post('/users', create)

Router.get('/users/:id', download)

module.exports = Router;