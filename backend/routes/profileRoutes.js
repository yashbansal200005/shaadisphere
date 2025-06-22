import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import upload from '../middleware/multerMiddleware.js';
import { createOrUpdateProfile, getMyProfile, getProfileById, getAllProfiles, } from '../controllers/profileController.js';
import optionalAuthMiddleware from '../middleware/optionalAuthMiddleware.js';
const router = express.Router();

router.post(
  '/save',
  authMiddleware,
  upload.fields([
    { name: 'image1', maxCount: 1 },
    { name: 'image2', maxCount: 1 },
    { name: 'image3', maxCount: 1 },
    { name: 'image4', maxCount: 1 }
  ]),
  createOrUpdateProfile
);
router.get('/me', authMiddleware, getMyProfile); 
router.get('/all', optionalAuthMiddleware, getAllProfiles); 
// router.get('/:id', getProfileById);   
router.get('/:id', optionalAuthMiddleware, getProfileById);


export default router;
