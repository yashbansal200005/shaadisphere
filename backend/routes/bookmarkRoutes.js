import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import {
  bookmarkProfile,
  getBookmarkedProfiles,
  removeBookmarkedProfile
} from '../controllers/bookmarkController.js';

const router = express.Router();

router.post('/add/:profileId', authMiddleware, bookmarkProfile);
router.get('/my', authMiddleware, getBookmarkedProfiles);
router.delete('/remove/:profileId', authMiddleware, removeBookmarkedProfile);

export default router;
