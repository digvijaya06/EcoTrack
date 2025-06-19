const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authMiddleware'); // JWT middleware
const isAdmin = require('../middleware/isAdmin'); // Admin check middleware
const blogController = require('../controllers/blogController');

// GET / - fetch all approved blogs with pagination, filtering, search
router.get('/', blogController.getBlogs);

// GET /:slug - fetch single blog by slug
router.get('/:slug', blogController.getBlogBySlug);

// POST / - create new blog (admin only)
router.post('/', authenticate, isAdmin, blogController.createBlog);

// PUT /:id - update blog (admin only)
router.put('/:id', authenticate, isAdmin, blogController.updateBlog);

// DELETE /:id - delete blog (admin only)
router.delete('/:id', authenticate, isAdmin, blogController.deleteBlog);

module.exports = router;
