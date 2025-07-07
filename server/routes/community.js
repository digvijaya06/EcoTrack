const express = require('express');
const router = express.Router();
const communityController = require('../controllers/communityController');
const { protect, admin } = require('../middleware/authMiddleware');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Set up multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(__dirname, '../uploads/community');
    fs.mkdirSync(uploadDir, { recursive: true });
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// Public route to get community posts
router.get('/', communityController.getCommunityPosts);

// Protected route to create a community post with photo upload
router.post('/', protect, upload.array('media', 5), communityController.createCommunityPost);

// Protected route to like a community post
router.post('/:id/like', protect, communityController.likeCommunityPost);

module.exports = router;
