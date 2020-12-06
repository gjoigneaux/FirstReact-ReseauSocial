const express = require('express');
const router = express.Router();
const messageCtlr = require('../Controllers/message');
const auth = require('../middelware/auth');
const multer = require('../middelware/multer-config');

//Routes pour les messages

router.post('/postmessage', auth, messageCtlr.postmessage);
router.post('/postmessagewithimage', auth, multer, messageCtlr.postmessagewithimage);
router.post('/postcommentaire', auth,  messageCtlr.postCommentaire);
router.delete('/deletepost/:id',  messageCtlr.deletePost);
router.put('/updatepost',  messageCtlr.updatePost);

router.get('/getallmessages', auth, messageCtlr.getAllMessages);
router.get('/getallmessagesoneuser/:id', auth, messageCtlr.getAllMessagesOneUser);
router.get('/getcommentaires/:id', auth, messageCtlr.getCommentaires);

module.exports = router;