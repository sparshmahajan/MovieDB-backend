const express = require("express");
const router = express.Router();
const { authMiddleware } = require('../middleware/auth.middleware')
const { login, signup, addWatch, removeWatch, deleteWatch, getWatch, forgotPassword, resetPassword } = require('../controllers/user.controller');

router.post('/signup', signup);
router.post('/signin', login);
router.post('/add', authMiddleware, addWatch);
router.post('/remove', authMiddleware, removeWatch);
router.post('/delete', authMiddleware, deleteWatch);
router.get('/get', authMiddleware, getWatch);
router.post('/forgot', forgotPassword);
router.post('/reset/', resetPassword);
router.get('/reset/:token', (req, res) => {
    res.render('reset_password', { token: req.params.token })
})

module.exports = router;
