const express = require('express');
const router = express.Router();
const dataCtlr = require('../Controllers/user');
const auth = require('../middelware/auth');


//Routes utilisateurs

router.post('/signup', dataCtlr.signup);
router.post('/login', dataCtlr.login);

router.get('/getusers', auth, dataCtlr.getUsers);
router.get('/getoneuser/:id', auth, dataCtlr.getOneUser);

router.delete('/deleteUser/:id', auth, dataCtlr.deleteUser);

module.exports = router;