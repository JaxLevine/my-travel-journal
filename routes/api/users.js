const express = require('express');
const router = express.Router();
const usersCtrl = require('../../controllers/api/users');
const ensureLoggedIn = require('../../config/ensureLoggedIn');

router.post('/', usersCtrl.create);
router.post('/login', usersCtrl.login);
router.get('/check-token', ensureLoggedIn, usersCtrl.checkToken);
router.get('/', usersCtrl.getAllUsers);
router.post('/follow/:userId', ensureLoggedIn, usersCtrl.follow);
router.post('/unfollow/:userId', ensureLoggedIn, usersCtrl.unfollow);

module.exports = router;