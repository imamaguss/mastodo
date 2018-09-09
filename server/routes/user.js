const router = require('express').Router();
const User = require('../controllers/user');

router.post('/signup', User.signup);
router.post('/signin', User.signin);
router.post('/loginViaFb', User.signinFb);

module.exports = router;