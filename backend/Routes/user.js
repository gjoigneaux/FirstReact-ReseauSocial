const express = require('express');
const router = express.Router();
const dataCtlr = require('../Controllers/user');
const auth = require('../middelware/auth');


//Routes utilisateurs

router.post('/signup', dataCtlr.signup);
router.post('/login', dataCtlr.login);

router.get('/getusers', dataCtlr.getUsers);
router.get('/getoneuser/:id', dataCtlr.getOneUser);

router.put('/updateuser/:id', dataCtlr.updateUser);
router.delete('/deleteUser/:id', dataCtlr.deleteUser);

module.exports = router;