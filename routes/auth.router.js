const express = require('express');
const { signup, login, getAllUsers } = require('../controllers/auth.controller');

const router = express.Router();

router.route('/signup').post(signup)
router.route('/login').post(login)
router.route('/users').get(getAllUsers)


module.exports = router;
