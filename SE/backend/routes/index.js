const express=require('express');
const blogController = require('../controllers/blog');
const authController =require('../controllers/auth');
const authMiddleware=require('../middlewares/auth')
const router=express.Router();


router.get('/blog',authMiddleware('client'),blogController.createblog);
router.post('/register',authController.register);
router.post('/login',authController.login);
// router.post('/logout',auth,authController.logout)

// router.post('/blog',blogController.createblog);
router.post('/blog',authMiddleware('client'),blogController.createblog);

router.get('/blog/all',authMiddleware('client'),blogController.getAll);
// router.get('/blog/all',blogController.getAll);

// router.get('/blog/:id',blogController.getbyId);
router.get('/blog/:id',authMiddleware('client'),blogController.getbyId);

module.exports=router