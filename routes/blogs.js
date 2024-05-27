const express = require('express');
const router = express.Router();
const { getAllBlogs, createBlog, getSingleBlog, deleteBlog, updateBlog } = require('../controllers/blogController');

router.get('/', getAllBlogs);
router.post('/', createBlog);
router.get('/:id', getSingleBlog);
router.delete('/:id', deleteBlog);
router.put('/:id', updateBlog);

module.exports = router;