const express=require('express');
const router=express.Router();
const imageController=require('../Controllers/ImageController');


router.post('/postImage',imageController.postImage);
router.get('/getImages',imageController.getImage);
module.exports=router;