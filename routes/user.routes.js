const express = require("express");
const router = express.Router();
const { authMiddleware } = require('../middleware/auth.middleware')
const { login, signup, addWatch, removeWatch, deleteWatch } = require('../controllers/user.controller');

router.post('/signup', signup);
router.post('/signin', login);
router.post('/add', authMiddleware, addWatch);
router.post('/remove', authMiddleware, removeWatch);
router.post('/delete', authMiddleware, deleteWatch);

module.exports = router;
